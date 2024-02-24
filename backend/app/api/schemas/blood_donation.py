from pydantic import BaseModel, Field
from typing import TYPE_CHECKING, Optional
from datetime import datetime


from .pet import PetDto


class BloodDonationDto(BaseModel):
    id: int
    amount: int
    date: datetime
    pet: PetDto


class PetSearchResult(BaseModel):
    id: int
    name: str
    weight: int
    type: str
    avatar: str
    blood_type: str = Field(..., alias="bloodType")


class BloodDonationSearchResult(BaseModel):
    id: int
    amount: int
    date: datetime
    pet: PetSearchResult
    city: Optional[str]


class BloodDonationCreate(BaseModel):
    amount: int
    date: datetime


class BloodDonationResponseDto(BaseModel):
    id: int
    blood_donation: BloodDonationDto
    msg: str
    amount: int
    pet: PetDto


class BloodDonationResponseCreate(BaseModel):
    msg: str
    amount: int
