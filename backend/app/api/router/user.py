import typing as tp
import sqlalchemy as sa
import sqlalchemy.orm as orm
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    status,
    HTTPException,
    UploadFile,
    File,
    Form,
)


from ..serializers import db_user_to_user_dto
from ...utils.files import save_image
from ..middlewares import get_current_user, get_session, UserTokenData
from ...models import User
from ..schemas import UserDto, UserCreate, UserUpdate


router: tp.Final[APIRouter] = APIRouter(prefix="/user")

# TODO: implement user routes /me /update


@router.get("/me", response_model=UserDto)
async def get_me(
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(User).where(User.id == current_user.user_id)
    db_user = (await db.execute(stmt)).scalar_one_or_none()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return db_user_to_user_dto(db_user)


@router.put("/profile/picture", response_model=UserDto)
async def update_profile_picture(
    avatar: UploadFile = File(...),
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(User).where(User.id == current_user.user_id)
    db_user = (await db.execute(stmt)).scalar_one_or_none()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    avatar_url = await save_image(avatar, db_user.id, "profile")
    db_user.avatar = avatar_url
    await db.commit()
    return db_user_to_user_dto(db_user)


@router.put("/profile", response_model=UserDto)
async def update_profile(
    user_data: UserUpdate,
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(User).where(User.id == current_user.user_id)
    db_user = (await db.execute(stmt)).scalar_one_or_none()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    if user_data.first_name:
        db_user.first_name = user_data.first_name
    if user_data.last_name:
        db_user.last_name = user_data.last_name
    if user_data.middle_name:
        db_user.middle_name = user_data.middle_name
    if user_data.middle_name:
        db_user.middle_name = user_data.middle_name
    db_user.email = user_data.email
    if user_data.contact_group and user_data.contact_group.email:
        db_user.contact_email = user_data.contact_group.email
    if user_data.contact_group and user_data.contact_group.phone:
        db_user.phone = user_data.contact_group.phone
    if user_data.city:
        db_user.city = user_data.city
    if user_data.wishes:
        db_user.wishes = user_data.wishes
    db_user.available_weekends_only = user_data.available_weekends_only
    db_user.avaliable_time = user_data.avaliable_time

    await db.commit()
    return db_user_to_user_dto(db_user)