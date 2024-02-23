from pydantic import BaseModel
from typing import TYPE_CHECKING
from datetime import datetime

if TYPE_CHECKING:
    from .pet import PetDto


class BloodRequestDto(BaseModel):
    id: int
    request_details: str
    date_requested: datetime
    pet: PetDto
