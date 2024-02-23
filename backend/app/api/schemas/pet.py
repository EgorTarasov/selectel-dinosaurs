from pydantic import BaseModel, HttpUrl
from typing import TYPE_CHECKING, Optional
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
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
    date_of_birth: datetime
    weight: float
    able_to_donate: bool
    owner: UserDto


class PetCreate(BaseModel):
    type: PetType
    breed: str
    avatar: Optional[HttpUrl] = "https://basetop.ru/wp-content/uploads/2018/10/hrkwaacv.jpg"
    name: str
    age: int
    weight: float
    able_to_donate: bool
    owner: UserDto


class PetDonateAble(BaseModel):
    able_to_donate: bool
