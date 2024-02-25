from pydantic import BaseModel, HttpUrl, Field
from typing import TYPE_CHECKING, Optional, List
from datetime import datetime
from enum import Enum

from .vaccine import VaccineDto


# from .vaccine import VaccineDto, VaccineCreate


class PetVaccineCreate(BaseModel):
    name: str
    date: datetime


class PetType(str, Enum):
    cat = "cat"
    dog = "dog"


class PetDto(BaseModel):
    id: int
    type: PetType
    breed: str
    avatar: str
    name: str
    age: int
    weight: float
    able_to_donate: bool
    donations: list
    requests: list
    vaccines: list[VaccineDto]
    cooldown_donation_days: int
    blood_type: str = Field(..., alias="bloodType")


class PetCreate(BaseModel):
    type: PetType
    breed: str
    avatar: Optional[str] = (
        "https://basetop.ru/wp-content/uploads/2018/10/hrkwaacv.jpg"
    )
    name: str
    age: int
    weight: float
    able_to_donate: bool
    blood_type: str = Field(..., alias="bloodType")
    # изменение вакцинации
    vaccines: list[PetVaccineCreate]


class PetUpdate(BaseModel):
    type: Optional[PetType] = None
    breed: Optional[str] = None
    avatar: Optional[str] = None
    name: Optional[str] = None
    age: Optional[int] = None
    weight: Optional[float] = None
    able_to_donate: Optional[bool] = None
    # изменение вакцинации
    vaccines: Optional[list[PetVaccineCreate]] = None
    blood_type: Optional[str] = Field(None, alias="bloodType")


class PetDonateAble(BaseModel):
    able_to_donate: bool
