from pydantic import BaseModel, HttpUrl
from typing import TYPE_CHECKING
from datetime import datetime

from .pet import PetDto


class VaccineDto(BaseModel):
    id: int
    name: str
    date: datetime
    expire_date: datetime
    pet: PetDto
