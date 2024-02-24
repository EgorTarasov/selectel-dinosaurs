import fastapi
from fastapi import FastAPI, HTTPException, Depends, Form, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
import sqlalchemy.orm as orm
import typing as tp


from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user, UserTokenData

from ...models import SocialMediaPost
from ..schemas import SocialMediaPostCreate, SocialMediaPostDto

router: tp.Final[APIRouter] = APIRouter(prefix="/social")


@router.get("/social", response_model=tp.List[SocialMediaPostDto])
async def get_social_posts(
    db: AsyncSession = Depends(get_session),
):
    stmt = sa.select(SocialMediaPost).order_by(sa.desc(SocialMediaPost.date))
    db_posts = list((await db.execute(stmt)).scalars().all())
    return [SocialMediaPostDto.model_validate(post) for post in db_posts]


@router.post("/social", response_model=SocialMediaPostDto)
async def create_social_post(
    post: SocialMediaPostCreate,
    current_user: UserTokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    db_post = SocialMediaPost(
        vkid=post.vkid,
        link=post.link,
        text=post.text,
        summary=post.summary,
        images=post.images,
        date=post.date,
        uploaded_by=current_user.user_id,
    )
    db.add(db_post)
    await db.commit()
    await db.refresh(db_post)
    return SocialMediaPostDto.model_validate(db_post)
