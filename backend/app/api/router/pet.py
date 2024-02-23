from fastapi import FastAPI, HTTPException, Depends, Form, APIRouter
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
import typing as tp

from ..middlewares.db_session import get_session
from ..schemas import PetDto, PetCreate, PetDonateAble

router: tp.Final[APIRouter] = APIRouter(prefix="/pets")


# Endpoint to get information about a specific pet including vaccinations, donations, and requests
@router.get("/pets/{pet_id}", response_model=PetDto)
def get_pet_info(pet_id: int, db: Session = Depends(get_session)):
    return PetDto()


# Endpoint to create a new pet
@router.post("/pets", response_model=PetDto)
def create_pet(
        pet: PetCreate,
        db: Session = Depends(get_session)
):
    return PetDto()


# Endpoint to get all pet cards
@router.get("/pets", response_model=tp.List[PetDto])
def get_all_pets(db: Session = Depends(get_session)):
    return [PetDto]


# Endpoint to update pet data
@router.put("/pets/{pet_id}", response_model=PetDto)
def update_pet(
        pet: PetCreate,
        db: Session = Depends(get_session),
):
    return PetDto()


# Endpoint to update the 'able_to_donate' flag for a pet
@router.put("/pets/{pet_id}/able-to-donate", response_model=PetDto)
def update_pet_donation_flag(pet_id: int, pet: PetDonateAble, db: Session = Depends(get_session)):
    return PetDto()
