from pydantic import BaseModel, HttpUrl
from typing import TYPE_CHECKING
from datetime import datetime
from enum import Enum

if TYPE_CHECKING:
    from .user import UserDto


class PetType(str, Enum):
    cat = "cat"
    dog = "dog"


class Pet(BaseModel):
    id: int
    type: PetType
    breed: str
    avatar: HttpUrl
    name: str
    date_of_birth: datetime
    weight: float
    able_to_donate: bool
    owner: UserDto
