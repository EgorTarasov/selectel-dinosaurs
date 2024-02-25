import logging
import datetime as dt
import typing as tp
import httpx

import sqlalchemy as sa
import sqlalchemy.orm as orm
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status, Query
from fastapi.responses import Response

from fastapi.security import OAuth2PasswordRequestForm
from app.worker import send_recovery_code


from ..middlewares.db_session import get_session

from ...settings import settings
from ...utils import jwt, password, EmailClient, EmailData

from ...models import User, ResetCode

from ..schemas import Token, UserCreate, VkPayload


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    db: AsyncSession = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    """Вход по почте и паролю"""
    try:
        # stmt = sa.select(User).where(User.email == form_data.username)
        # get User with role_data
        stmt = sa.select(User).where(User.email == form_data.username)
        db_user: User | None = (await db.execute(stmt)).unique().scalar_one_or_none()

        if db_user is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND)

        if password.PasswordManager.verify_password(
            form_data.password, db_user.password
        ):
            token = jwt.JWTEncoder.create_access_token(db_user.id, db_user.role)
            return Token(access_token=token, token_type="Bearer")
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )
    except Exception as e:
        logging.error(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )


@router.post("/register")
async def register(
    user: UserCreate,
    db: AsyncSession = Depends(get_session),
) -> Token:
    """Регистрация нового пользователя"""

    stmt = sa.select(User).where(User.email == user.email)
    db_user: User | None = (await db.execute(stmt)).unique().scalar_one_or_none()
    if db_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )
    else:
        db_user = User(
            first_name="",
            last_name="",
            middle_name="",
            email=user.email,
            role="user",
            password="",
        )
        db_user.password = password.PasswordManager.hash_password(user.password)
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        token = jwt.JWTEncoder.create_access_token(db_user.id, db_user.role)
        return Token(access_token=token, token_type="Bearer")


@router.post("/login/vk")
async def auth_vk(
    payload: VkPayload,
    db: AsyncSession = Depends(get_session),
) -> Token:
    """Вход через ВКонтакте"""
    stmt = sa.select(User).where(User.vkid == payload.user.id)
    db_user: User | None = (await db.execute(stmt)).unique().scalar_one_or_none()

    if db_user:
        logging.info(f"found user: {db_user.vkid} {db_user.email}")
        token = jwt.JWTEncoder.create_access_token(db_user.id, db_user.role)
        return Token(access_token=token, token_type="Bearer")
    else:
        db_user = User(
            first_name=payload.user.first_name,
            last_name=payload.user.last_name,
            vkid=payload.user.id,
            middle_name="",
            email=(
                payload.user.email
                if payload.user.email
                else f"{payload.user.id}+{dt.datetime.now().isoformat()}@larek.tech"
            ),
            role="user",
            password="",
        )
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        token = jwt.JWTEncoder.create_access_token(db_user.id, db_user.role)
    return Token(access_token=token, token_type="Bearer")


# def send_email(data: EmailData):


@router.post("/password-code")
async def password_code(
    background_tasks: BackgroundTasks,
    email: str,
    db: AsyncSession = Depends(get_session),
):
    stmt = sa.select(User).where(User.email == email)
    db_user = (await db.execute(stmt)).scalar_one_or_none()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    code = password.PasswordManager.get_reset_code(email)

    # send email with token
    # email_client = EmailClient(settings.mail_user, settings.mail_password)
    # logging.debug("sending email about password recover")
    # subject = "Смена пароля"
    # template = "password_recover.jinja"
    # link_on_password_recover = f"{settings.domain}/reset-password?token={code}"

    # data = {
    #     "fullname": f"{db_user.first_name} {db_user.last_name}",
    #     "link_on_password_recover": link_on_password_recover,
    # }
    # email_client.send_mailing(email, subject, template, data)
    send_recovery_code.delay(email, db_user.first_name, db_user.last_name, code)

    db_reset_code = ResetCode(user_id=db_user.id, code=code)
    db.add(db_reset_code)
    await db.commit()

    return Response(status_code=status.HTTP_200_OK)


@router.get("/password-reset")
async def reset_password(
    token: str,
    newPassword: str = Query(..., description="Новый пароль"),
    db: AsyncSession = Depends(get_session),
):
    stmt = (
        sa.select(ResetCode)
        .options(orm.selectinload(ResetCode.user))
        .where(ResetCode.code == token)
    )
    db_reset_code = (await db.execute(stmt)).scalar_one_or_none()
    if not db_reset_code:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Code not found"
        )

    db_user = db_reset_code.user
    db_user.password = password.PasswordManager.hash_password(newPassword)
    db.add(db_user)
    await db.commit()
    return Response(status_code=status.HTTP_200_OK)
