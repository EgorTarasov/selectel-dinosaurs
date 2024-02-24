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
    age: int
    type: str
    avatar: str
    blood_type: str = Field(..., alias="bloodType")


class OwnerSearchResultContactGroup(BaseModel):
    hidden: bool
    phone: Optional[str]
    email: Optional[str]


class OwnerSearchResult(BaseModel):
    vkid: Optional[int]
    contact_group: OwnerSearchResultContactGroup = Field(..., alias="contactGroup")
    wishes: Optional[str]


class BloodDonationSearchResult(BaseModel):
    id: int
    amount: int
    date: datetime
    pet: PetSearchResult
    owner: OwnerSearchResult
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


class BloodDonationUpdate(BaseModel):
    msg: Optional[str] = None
    amount: Optional[int] = None
