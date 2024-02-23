from datetime import datetime
from typing import List
from ...models import Pet
from ..schemas import PetDto

from .user import db_user_to_user_dto

COOLDOWN_DAYS_AFTER_DONATION = 2 * 31


async def db_pet_to_pet_dto(db_pet: Pet, is_full=False):
    if is_full:
        from .blood_donation import db_blood_donations_to_blood_donation_dtos
        from .blood_request import db_blood_requests_to_blood_request_dtos
        from .vaccine import db_vaccines_to_vaccine_dtos
        donations = await db_blood_donations_to_blood_donation_dtos(db_pet.blood_donations)
        requests = await db_blood_requests_to_blood_request_dtos(db_pet.blood_requests)
        vaccines = await db_vaccines_to_vaccine_dtos(db_pet.vaccines)
        donations.sort(key=lambda x: x.date)
        requests.sort(key=lambda x: x.date)
        vaccines.sort(key=lambda x: x.date)
        last_donation = donations[-1] if donations else datetime(year=1970, month=1, day=1)
        days_left_after_last_donation = (datetime.now() - last_donation).days
        cooldown_donation_days = max(0, COOLDOWN_DAYS_AFTER_DONATION - days_left_after_last_donation)
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
        donations=donations if is_full else [],
        requests=requests if is_full else [],
        vaccines=vaccines if is_full else [],
        cooldown_donation_days=cooldown_donation_days if is_full else 0,
    )


async def db_pets_to_pet_dtos(db_pets: List[Pet], is_full=False) -> List[PetDto]:
    return [await db_pet_to_pet_dto(db_pet, is_full) for db_pet in db_pets]
