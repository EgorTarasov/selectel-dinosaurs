from pydantic import BaseModel, Field, ConfigDict
from typing import TYPE_CHECKING, List
import typing as tp

from ..schemas import BloodDonationDto


class BankDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    address: str
    longitude: tp.Optional[float] = Field(None)
    latitude: tp.Optional[float] = Field(None)
    price: int = Field(..., alias="pricePerMil")
    amount: int = Field(0, alias="amountOfBlood")
    phone: tp.Optional[str] = Field(None)
    link: tp.Optional[str] = Field(None)
    dogStorage: tp.Dict[str, int] = Field(
        {
            "DEA_1_1": 0,
            "DEA_1_2": 0,
            "DEA_3": 0,
            "DEA_4": 0,
            "DEA_5": 0,
            "DEA_7": 0,
        }
    )
    catStorage: tp.Dict[str, int] = Field(
        {
            "A": 0,
            "B": 0,
            "AB": 0,
        }
    )


class BankResponse(BaseModel):
    id: int
    name: str
    address: str
    price: int
    link: str
    dogStorage: tp.Dict[str, int] = Field(
        {
            "DEA_1_1": 0,
            "DEA_1_2": 0,
            "DEA_3": 0,
            "DEA_4": 0,
            "DEA_5": 0,
            "DEA_7": 0,
        }
    )
    catStorage: tp.Dict[str, int] = Field(
        {
            "A": 0,
            "B": 0,
            "AB": 0,
        }
    )


class BankCreate(BaseModel):
    name: str = Field(..., min_length=3, max_length=50)
