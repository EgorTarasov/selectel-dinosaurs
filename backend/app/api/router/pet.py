import fastapi
from fastapi import FastAPI, HTTPException, Depends, Form, APIRouter
from sqlalchemy.ext.asyncio import AsyncSession
import sqlalchemy as sa
import sqlalchemy.orm as orm
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import typing as tp

from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user, UserTokenData

from ...models import Pet
from ..schemas import PetDto, PetCreate, PetDonateAble, PetUpdate
from ..serializers import db_pet_to_pet_dto, db_pets_to_pet_dtos
from ... import crud

router: tp.Final[APIRouter] = APIRouter(prefix="/pets")


@router.get("/pets/my", response_model=tp.List[PetDto])
async def get_my_pets(
    current_user: UserTokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    stmt = (
        sa.select(Pet)
        .options(
            orm.selectinload(Pet.owner),
            orm.selectinload(Pet.vaccines),
            orm.selectinload(Pet.blood_donations),
            orm.selectinload(Pet.blood_requests),
        )
        .where(Pet.owner_id == current_user.user_id)
    )
    pets = list((await db.execute(stmt)).scalars().all())
    return db_pets_to_pet_dtos(pets)


# Endpoint to get information about a specific pet including vaccinations, donations, and requests
@router.get("/pets/{pet_id}", response_model=PetDto)
async def get_pet_info(
    pet_id: int,
    current_user: UserTokenData = Depends(get_current_user),
    db: AsyncSession = Depends(get_session),
):
    try:
        return db_pet_to_pet_dto(await crud.get_pet(pet_id, db))
    except Exception as e:
        print(e)
        raise fastapi.HTTPException(
            status_code=404, detail=f"Pet with id {pet_id} not found"
        )


# Endpoint to create a new pet
@router.post("/pets", response_model=PetDto)
async def create_pet(
    pet: PetCreate,
    db: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    try:
        db_pet = await crud.create_pet(current_user.user_id, pet, db)
        return db_pet_to_pet_dto(db_pet)
    except Exception as e:
        print(e)
        raise fastapi.HTTPException(
            status_code=400, detail=f"Pet create error: {str(e)}"
        )


# Endpoint to get all pet cards
@router.get("/pets", response_model=tp.List[PetDto])
async def get_all_pets(db: AsyncSession = Depends(get_session)):
    return db_pets_to_pet_dtos(await crud.get_pets(db))


# Endpoint to update pet data
@router.put("/pets/{pet_id}", response_model=PetDto)
async def update_pet(
    pet_id: int,
    pet: PetUpdate,
    db: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    try:
        db_pet = await crud.update_pet(current_user.user_id, pet_id, pet, db)
        return db_pet_to_pet_dto(db_pet)
    except Exception as e:
        raise fastapi.HTTPException(
            status_code=400, detail=f"Pet update error: {str(e)}"
        )


# Endpoint to update the 'able_to_donate' flag for a pet
@router.put("/pets/{pet_id}/able-to-donate", response_model=PetDto)
async def update_pet_donation_flag(
    pet_id: int,
    pet: PetDonateAble,
    db: AsyncSession = Depends(get_session),
    current_user=Depends(get_current_user),
):
    try:
        able_to_donate = pet.able_to_donate
        pet_update = PetUpdate(able_to_donate=able_to_donate)
        db_pet = await crud.update_pet(current_user.user_id, pet_id, pet_update, db)
        return db_pet_to_pet_dto(db_pet)
    except Exception as e:
        raise fastapi.HTTPException(
            status_code=400, detail=f"Pet update donation ability error: {str(e)}"
        )
