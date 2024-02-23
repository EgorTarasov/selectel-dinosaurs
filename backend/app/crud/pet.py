from sqlalchemy.orm import Session, selectinload
import sqlalchemy as sa
from ..models import Pet
from typing import Optional, List

from ..api.schemas import PetCreate, PetUpdate


async def create_pet(owner_id: int, pet_create: PetCreate, db: Session) -> Pet:
    pet = Pet(
        type=pet_create.type,
        breed=pet_create.breed,
        avatar=str(pet_create.avatar),
        name=pet_create.name,
        age=pet_create.age,
        weight=pet_create.weight,
        able_to_donate=pet_create.able_to_donate,
        owner_id=owner_id
    )
    db.add(pet)
    await db.commit()
    await db.refresh(pet, ["id", "owner", "vaccines", "blood_donations", "blood_requests"])
    print("pet", pet)

    return pet


async def update_pet(owner_id: int, pet_id: int, pet_update: PetUpdate, db: Session) -> Pet:
    pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if pet:
        if pet.owner_id != owner_id:
            raise ValueError("You are not owner of this pet")
        for key, value in pet_update.dict().items():
            if value:
                setattr(pet, key, value)
        await db.commit()
        await db.refresh(pet)
        return pet
    else:
        raise ValueError(f"Pet with id {pet_id} not found")


async def get_pet(pet_id: int, db: Session) -> Pet:
    pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if pet:
        return pet
    raise ValueError(f"Pet with id {pet_id} not found")


async def get_pets(db: Session) -> List[Pet]:
    stmt = sa.select(Pet).options(sa.orm.selectinload(Pet.owner, Pet.vaccines, Pet.vaccines, Pet.blood_donations, Pet.blood_requests, Pet.blood_donation_responses, Pet.blood_request_responses))
    result = await db.execute(stmt)
    pets = result.scalars().all()
    print(pets)
    return pets
