from ...models import Pet
from ..schemas import PetDto

from .user import db_user_to_user_dto

async def db_pet_to_pet_dto(db_pet: Pet):
    return PetDto(
        id=db_pet.id,
    type=db_pet.type,
    breed=db_pet.breed,
    avatar=db_pet.avatar,
    name=db_pet.name,
    age=db_pet.age,
    weight=db_pet.weight,
    able_to_donate=db_pet.able_to_donate,
    owner=db_user_to_user_dto(db_pet.owner),
    donations: List
    requests: List
    vaccines: List
    cooldown_donation_days: int
    )
