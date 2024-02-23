from pydantic import BaseModel
from typing import TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from .pet import PetDto


class BloodDonationDto(BaseModel):
    id: int
    amount: int
    date: datetime
    pet: PetDto
