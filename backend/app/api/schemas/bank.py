from pydantic import BaseModel
from typing import TYPE_CHECKING, List
from datetime import datetime

from ..schemas import BloodDonationDto


class BankDto(BaseModel):
    id: int
    name: str
    address: str
    donations: List[BloodDonationDto]
