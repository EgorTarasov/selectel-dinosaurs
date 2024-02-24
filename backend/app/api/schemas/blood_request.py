from pydantic import BaseModel
from typing import TYPE_CHECKING, Optional
from datetime import datetime
from .pet import PetDto


class BloodRequestDto(BaseModel):
    id: int
    amount: int
    due_date: datetime
    date: datetime
    pet: PetDto
    msg: Optional[str] = "Большая потеря крови"
    address: Optional[str] = "Москва"


class BloodRequestCreate(BaseModel):
    amount: int
    due_date: datetime
    msg: Optional[str] = "Большая потеря крови"
    address: Optional[str] = "Москва"


class BloodRequestResponseDto(BaseModel):
    id: int
    blood_request: BloodRequestDto
    msg: str
    amount: int


class BloodRequestResponseCreate(BaseModel):
    msg: str
    amount: int


class BloodRequestUpdate(BaseModel):
    amount: Optional[int] = None
    due_date: Optional[datetime] = None
    msg: Optional[str] = "Большая потеря крови"
    address: Optional[str] = "Москва"
