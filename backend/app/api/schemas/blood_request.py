from pydantic import BaseModel
from typing import TYPE_CHECKING
from datetime import datetime

from .pet import PetDto


class BloodRequestDto(BaseModel):
    id: int
    amount: int
    due_date: datetime
    date: datetime
    pet: PetDto


class BloodRequestCreate(BaseModel):
    amount: int
    due_date: datetime


class BloodRequestResponseDto(BaseModel):
    id: int
    blood_request: BloodRequestDto
    msg: str
    amount: int
    pet: PetDto


class BloodRequestResponseCreate(BaseModel):
    msg: str
    amount: int