import logging
import datetime as dt
import sqlalchemy.orm as orm
from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
from ..models import Pet, Vaccine
from typing import Optional, List

from ..api.schemas import PetCreate, PetUpdate


async def create_pet(owner_id: int, pet_create: PetCreate, db: AsyncSession) -> Pet:
    vacs = []
    if pet_create.vaccines and len(pet_create.vaccines) > 0:
        vacs = [
            Vaccine(
                name=vac.name,
                date=vac.date,
                expire_date=vac.date + dt.timedelta(days=60),
            )
            for vac in pet_create.vaccines
        ]

        db.add_all(vacs)

    pet = Pet(
        type=pet_create.type,
        breed=pet_create.breed,
        avatar=str(pet_create.avatar),
        name=pet_create.name,
        age=pet_create.age,
        weight=pet_create.weight,
        able_to_donate=pet_create.able_to_donate,
        owner_id=owner_id,
        vaccines=vacs,
        blood_type=pet_create.blood_type,
    )
    db.add(pet)
    await db.commit()
    await db.refresh(
        pet, ["id", "owner", "vaccines", "blood_donations", "blood_requests"]
    )
    # print("pet", pet)

    return pet


async def update_pet(
    owner_id: int, pet_id: int, pet_update: PetUpdate, db: AsyncSession
) -> Pet:
    stmt = (
        sa.select(Pet)
        .options(
            orm.selectinload(Pet.owner),
            orm.selectinload(Pet.vaccines),
            orm.selectinload(Pet.blood_donations),
            orm.selectinload(Pet.blood_requests),
        )
        .where(Pet.id == pet_id)
    )
    pet = (await db.execute(stmt)).scalar_one_or_none()
    # pet = db.query(Pet).filter(Pet.id == pet_id).first()
    if pet:

        if pet.owner_id != owner_id:
            raise ValueError("You are not owner of this pet")
        # for key, value in pet_update.model_dump().items():
        #     if value is not None:
        #         if key == "avatar":
        #             value = str(value)
        if pet_update.vaccines and len(pet_update.vaccines) > 0:
            vacs = [
                Vaccine(
                    name=vac.name,
                    date=vac.date,
                    expire_date=vac.date + dt.timedelta(days=60),
                    pet_id=pet_id,
                )
                for vac in pet_update.vaccines
            ]
            db.add_all(vacs)
            pet.vaccines += vacs
        if pet_update.type:
            pet.type = pet_update.type
        if pet_update.breed:
            pet.breed = pet_update.breed
        if pet_update.name:
            pet.name = pet_update.name
        if pet_update.age:
            pet.age = pet_update.age
        if pet_update.weight:
            pet.weight = pet_update.weight
        if pet_update.able_to_donate:
            pet.able_to_donate = pet_update.able_to_donate

        if pet_update.blood_type:
            pet.blood_type = pet_update.blood_type

        if pet_update.avatar:
            pet.avatar = pet_update.avatar

        await db.commit()
        await db.refresh(pet, ["vaccines", "blood_donations", "blood_requests"])
        return pet
    else:
        raise ValueError(f"Pet with id {pet_id} not found")


async def get_pet(pet_id: int, db: AsyncSession) -> Pet:

    stmt = (
        sa.select(Pet)
        .options(
            orm.selectinload(Pet.owner),
            orm.selectinload(Pet.vaccines),
            orm.selectinload(Pet.blood_donations),
            orm.selectinload(Pet.blood_requests),
        )
        .where(Pet.id == pet_id)
    )

    pet = (await db.execute(stmt)).scalar_one_or_none()
    if pet:
        return pet
    else:
        print("pet", pet)
        raise ValueError(f"Pet with id {pet_id} not found")


async def get_pets(db: AsyncSession) -> List[Pet]:
    stmt = sa.select(Pet).options(
        orm.selectinload(Pet.owner),
        orm.selectinload(Pet.vaccines),
        orm.selectinload(Pet.blood_donations),
        orm.selectinload(Pet.blood_requests),
    )
    result = await db.execute(stmt)
    return list(result.scalars().all())
