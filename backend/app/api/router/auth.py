import logging
import datetime as dt
import typing as tp
import httpx

import sqlalchemy as sa
import sqlalchemy.orm as orm
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm


from ..middlewares.db_session import get_session

# from utils import jwt, password
from ...utils import jwt, password

from ...models import User

from ..schemas import Token, UserCreate


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=Token)
async def login(
    db: AsyncSession = Depends(get_session),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Token:
    """Вход по почте и паролю"""
    print(form_data.username, form_data.password)
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
        print(e)
        logging.error(e)
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect email or password",
        )


@router.post("/register")
async def register(
    user: UserCreate,
    db: AsyncSession = Depends(get_session),
):
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
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            role=user.role,
            password="",
        )
        db_user.password = password.PasswordManager.hash_password(user.password)
        db.add(db_user)
        await db.commit()
        await db.refresh(db_user)
        token = jwt.JWTEncoder.create_access_token(db_user.id, db_user.role)
        return Token(access_token=token, token_type="Bearer")


# @router.post("/vk")
# async def auth_vk(
#     background_tasks: BackgroundTasks,
#     code: str = Query(..., description="Код авторизации"),
#     db: AsyncSession = Depends(get_session),
# ) -> Token:

#     url = settings.vk_token_url.format(
#         client_id=settings.vk_client_id,
#         vk_secure_token=settings.vk_secure_token,
#         redirect_uri=settings.vk_redirect_uri,
#         code=code,
#     )

#     client: tp.Final[httpx.AsyncClient] = httpx.AsyncClient()

#     response = await client.get(url)

#     if response.status_code != 200:
#         raise HTTPException(
#             status_code=status.HTTP_401_UNAUTHORIZED, detail=response.json()
#         )

#     access_token = response.json()["access_token"]
#     user_id = response.json()["user_id"]
#     vk_user_stmt = (
#         sa.select(VkUser)
#         .options(orm.joinedload(VkUser.groups))
#         .where(VkUser.id == user_id)
#     )
#     db_vk_user: VkUser | None = (
#         (await db.execute(vk_user_stmt)).unique().scalar_one_or_none()
#     )
#     # TODO: separate vk_api calls
#     if db_vk_user is None:
#         response = await client.get(
#             settings.vk_base_url + "/users.get",
#             headers={"Authorization": f"Bearer {access_token}"},
#             params={"fields": "photo_200, sex, city, bdate, schools", "v": "5.199"},
#         )

#         logging.info(f"{response.json()}")

#         user_info: dict[str, tp.Any] = response.json()["response"][0]

#         if "bdate" in user_info.keys():
#             d, m, y = map(int, user_info["bdate"].split("."))  # 10.6.2003
#             bdate = dt.datetime(y, m, d)
#         else:
#             bdate = dt.datetime(2000, 1, 1)

#         if "city" in user_info.keys():
#             city = user_info["city"]["title"]
#         else:
#             city = "Не указан"

#         if "sex" in user_info.keys():
#             """
#             •
#                 1 — женский;
#                 •
#                 2 — мужской;
#                 •
#                 0 — пол не указан.
#             """
#             if user_info["sex"] == 1:
#                 sex = "женский"
#             elif user_info["sex"] == 2:
#                 sex = "мужской"
#             else:
#                 sex = "пол не указан"
#         else:
#             sex = "пол не указан"

#         db_vk_user = VkUser(
#             id=user_info["id"],
#             first_name=user_info["first_name"],
#             last_name=user_info["last_name"],
#             photo_url=user_info["photo_200"],
#             bdate=bdate,
#             city=city,
#             sex=sex,
#         )
#         db.add(db_vk_user)
#         await db.commit()
#         await db.refresh(db_vk_user)
#     background_tasks.add_task(vk.update_groups, db, client, db_vk_user, access_token)
#     return Token(
#         access_token=jwt.JWTEncoder.create_access_token(db_vk_user.id),
#         token_type="Bearer",
#     )
