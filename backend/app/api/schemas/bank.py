from pydantic import BaseModel, Field, ConfigDict
from typing import TYPE_CHECKING, List
import typing as tp

from ..schemas import BloodDonationDto


class BankDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    address: str
    city: str
    price: int = Field(..., alias="pricePerMil")
    amount: int = Field(0, alias="amountOfBlood")
    phone: tp.Optional[str] = Field(None)
    link: tp.Optional[str] = Field(None)
    # donations: List[BloodDonationDto]


class BankResponse(BaseModel):
    id: int
    name: str
    address: str
    price: int
    link: str


class BankCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
