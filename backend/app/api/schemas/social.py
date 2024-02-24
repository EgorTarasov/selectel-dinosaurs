import datetime as dt
from pydantic import BaseModel, ConfigDict


class SocialMediaPostCreate(BaseModel):
    vkid: int
    link: str
    text: str
    summary: str
    images: list[str]
    date: dt.datetime


class SocialMediaPostDto(SocialMediaPostCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    uploaded_by: int
    uploaded_at: dt.datetime
