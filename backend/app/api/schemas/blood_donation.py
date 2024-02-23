from pydantic import BaseModel
from typing import TYPE_CHECKING
from datetime import datetime

from .pet import PetDto


class BloodDonationDto(BaseModel):
    id: int
    amount: int
    date: datetime
    pet: PetDto


class BloodDonationCreate(BaseModel):
    amount: int
    date: datetime


class BloodDonationResponseDto(BaseModel):
    id: int
    blood_response: BloodDonationDto
    msg: str
    amount: int
    pet: PetDto


class BloodDonationResponseCreate(BaseModel):
    msg: str
    amount: int
