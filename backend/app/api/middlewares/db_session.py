import typing as tp

from ...db import db

from sqlalchemy.ext.asyncio import AsyncSession


async def get_session() -> tp.AsyncGenerator[AsyncSession, AsyncSession]:
    async with db.session_factory() as session:
        yield session
