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
from ..schemas import VaccineDto, VaccineCreate

router: tp.Final[APIRouter] = APIRouter(prefix="/vaccines")


# TODO: implement user routes /me /update


@router.post("/{pet_id}", response_model=VaccineDto)
async def add_vaccine(
        create_vaccine: VaccineCreate,
        db: AsyncSession = Depends(get_session),
        current_user: UserTokenData = Depends(get_current_user),
):
    return None
