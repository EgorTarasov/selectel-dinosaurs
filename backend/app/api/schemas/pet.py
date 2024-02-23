from pydantic import BaseModel, HttpUrl
from typing import TYPE_CHECKING, Optional, List
from datetime import datetime
from enum import Enum

from .user import UserDto


class PetType(str, Enum):
    cat = "cat"
    dog = "dog"


class PetDto(BaseModel):
    id: int
    type: PetType
    breed: str
    avatar: HttpUrl
    name: str
    age: int
    weight: float
    able_to_donate: bool
    owner: UserDto
    donations: List
    requests: List
    vaccines: List
    cooldown_donation_days: int


class PetCreate(BaseModel):
    type: PetType
    breed: str
    avatar: Optional[HttpUrl] = "https://basetop.ru/wp-content/uploads/2018/10/hrkwaacv.jpg"
    name: str
    age: int
    weight: float
    able_to_donate: bool


class PetUpdate(BaseModel):
    type: Optional[PetType] = None
    breed: Optional[str]
    avatar: Optional[HttpUrl] = "https://basetop.ru/wp-content/uploads/2018/10/hrkwaacv.jpg"
    name: Optional[str]
    age: Optional[int]
    weight: Optional[float]
    able_to_donate: Optional[bool]


class PetDonateAble(BaseModel):
    able_to_donate: bool
