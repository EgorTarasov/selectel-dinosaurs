import typing as tp
import datetime as dt
from pydantic import BaseModel, Field, ConfigDict


class BankDonation(BaseModel):
    """
        реципиент
        {

      date: new Date('2024-02-28T21:00:00.000Z'),

      time: '11:00',

      animal_type: 'dog',

      blood_type: 'DEA_7',

      count: 0,

      bank: 1

    }
    """

    date: dt.datetime = Field(...)
    time: str = Field(...)
    animal_type: tp.Annotated[str, tp.Literal["cat", "dog"]] = Field(...)
    blood_type: str = Field(...)
    count: int = Field(...)
    bank_id: int = Field(..., alias="bank")


class BankDonationResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    date: str
    animal_type: str
    blood_type: str
    count: int
