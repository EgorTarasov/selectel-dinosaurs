import typing as tp
import sqlalchemy as sa
import sqlalchemy.orm as orm
import logging
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import APIRouter, Depends, status, HTTPException


from ..middlewares import get_current_user, get_session
from ...models import User
from ..schemas import UserDto


router: tp.Final[APIRouter] = APIRouter(prefix="/user")

# TODO: implement user routes /me /update


@router.get("/me")
async def get_me(
    db: AsyncSession = Depends(get_session),
    current_user: User = Depends(get_current_user),
):
    return current_user
