from pydantic import BaseModel
from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from .pet import PetDto
    from .blood_request import BloodRequestDto


class ResponseDto(BaseModel):
    id: int
    pet_id: int
    blood_request: BloodRequestDto
    msg: str
    amount: int
    pet: PetDto
