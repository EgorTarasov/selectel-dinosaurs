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

    return UserDto.model_validate(db_user)


@router.put("/profile", response_model=UserDto)
async def update_profile(
    avatar: UploadFile | None = File(None),
    first_name: str = Form(...),
    last_name: str = Form(...),
    email: str = Form(...),
    city: str = Form(...),
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(User).where(User.id == current_user.user_id)
    db_user = (await db.execute(stmt)).scalar_one_or_none()
    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    db_user.first_name = first_name
    db_user.last_name = last_name
    db_user.email = email
    db_user.city = city
    if avatar:
        avatar_url = await save_image(avatar, db_user.id, "profile")
        db_user.avatar = avatar_url
    await db.commit()
    return UserDto.model_validate(db_user)
