from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user
from ..schemas import BloodDonationCreate, BloodDonationDto, BloodDonationResponseCreate, BloodDonationResponseDto
from ...models import User, BloodDonation
from ..serializers import db_blood_donation_to_blood_donation_dto

router = APIRouter(prefix="/blood-donations")


@router.get("/", response_model=List[BloodDonationDto])
async def get_all_blood_donations(
        type: Optional[str] = None,
        breed: Optional[str] = None,
        weight: Optional[float] = None,
        db: Session = Depends(get_session),
):
    return []


@router.post("/pet/{pet_id}", response_model=BloodDonationDto)
async def create_blood_donation_request(
        pet_id: int,
        blood_donation: BloodDonationCreate,
        db: Session = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    blood_donation = BloodDonation(
        pet_id=pet_id,
        amount=blood_donation.amount,
        date=blood_donation.date,
    )
    db.add(blood_donation)
    await db.commit()
    await db.refresh(
        blood_donation, ["id"]
    )
    await db.refresh(blood_donation.pet, ["id", "owner", "vaccines", "blood_donations", "blood_requests"])
    return db_blood_donation_to_blood_donation_dto(blood_donation)


@router.put("/pet/{pet_id}", response_model=BloodDonationDto)
async def update_blood_donation_request(
        pet_id: int,
        blood_donation: BloodDonationCreate,
        db: Session = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    return BloodDonationDto()


@router.post("/{blood_donation_id}/pet/{pet_id}", response_model=BloodDonationResponseDto)
async def create_response_to_blood_request(
        blood_donation_id: int,
        pet_id: int,
        blood_response: BloodDonationResponseCreate,
        db: Session = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    # Replace the following line with the actual logic to create a response to a blood request
    return BloodDonationResponseDto()


# Endpoint to get all responses for a blood donation request
@router.get("/response/{blood_donation_id}", response_model=List[BloodDonationResponseDto])
async def get_responses_for_blood_donation_request(
        blood_donation_id: int,
        db: Session = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    # Replace the following line with the actual logic to get all responses for a blood donation request
    return []
