from pydantic import BaseModel
from typing import TYPE_CHECKING
from datetime import datetime


class BloodRequestDto(BaseModel):
    id: int
    amount: int
    due_date: datetime
    date: datetime


class BloodRequestCreate(BaseModel):
    amount: int
    due_date: datetime


class BloodRequestResponseDto(BaseModel):
    id: int
    blood_request: BloodRequestDto
    msg: str
    amount: int


class BloodRequestResponseCreate(BaseModel):
    msg: str
    amount: int
