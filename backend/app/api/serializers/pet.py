from datetime import datetime
from typing import List
from ...models import Pet
from ..schemas import PetDto

from .user import db_user_to_user_dto

COOLDOWN_DAYS_AFTER_DONATION = 2 * 31


def db_pet_to_pet_dto(db_pet: Pet, is_full=True):
    return PetDto.model_validate(
        {
            "id": db_pet.id,
            "type": db_pet.type,
            "breed": db_pet.breed,
            "avatar": db_pet.avatar,
            "name": db_pet.name,
            "age": db_pet.age,
            "weight": db_pet.weight,
            "bloodType": db_pet.blood_type,
            "able_to_donate": db_pet.able_to_donate,
            "donations": [
                {
                    "id": don.id,
                    "date": don.date,
                    "amount": don.amount,
                }
                for don in db_pet.blood_donations
            ],
            "requests": [
                {
                    "id": req.id,
                    "date": req.date,
                    "amount": req.amount,
                }
                for req in db_pet.blood_requests
            ],
            "vaccines": [
                {
                    "id": vac.id,
                    "name": vac.name,
                    "date": vac.date,
                    "expire_date": vac.expire_date,
                }
                for vac in db_pet.vaccines
            ],
            "cooldown_donation_days": (
                max((datetime.now() - last_donation).days, COOLDOWN_DAYS_AFTER_DONATION)
                if len(db_pet.blood_donations) > 0
                and (last_donation := db_pet.blood_donations[-1].date)
                else 0
            ),
        }
    )


def db_pets_to_pet_dtos(db_pets: List[Pet], is_full=False) -> List[PetDto]:
    return [db_pet_to_pet_dto(db_pet, is_full) for db_pet in db_pets]
