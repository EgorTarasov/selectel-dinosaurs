import fastapi
from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import orm
import sqlalchemy as sa
from typing import List, Optional
from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user
from ..schemas import (
    BloodDonationCreate,
    BloodDonationDto,
    BloodDonationResponseCreate,
    BloodDonationResponseDto,
)
from ...models import User, BloodDonation, BloodDonationResponse
from ..serializers import db_blood_donation_to_blood_donation_dto, \
    db_blood_donation_response_to_blood_donation_response_dto, \
    db_blood_donation_responses_to_blood_donation_response_dtos, db_blood_donations_to_blood_donation_dtos

router = APIRouter(prefix="/blood-donations")


@router.get("/", response_model=List[BloodDonationDto])
async def get_all_blood_donations(
        type: Optional[str] = None,
        breed: Optional[str] = None,
        weight: Optional[float] = None,
        amount: Optional[int] = None,
        db: AsyncSession = Depends(get_session),
):  # -> list[Any]:
    stmt = sa.select(BloodDonation).options(
        orm.selectinload(BloodDonation.pet)
    )

    res = []
    for t in (await db.execute(stmt)).all():
        db_blood_donation = t[0]
        if breed and db_blood_donation.pet.breed != breed:
            continue
        if weight and db_blood_donation.pet.weight < weight:
            continue
        if amount and db_blood_donation.amount < amount:
            continue
        await db.refresh(
            db_blood_donation.pet,
            ["id", "owner"],
        )
        res.append(db_blood_donation)

    return db_blood_donations_to_blood_donation_dtos(res)


@router.post("/pet/{pet_id}", response_model=BloodDonationDto)
async def create_blood_donation_request(
        pet_id: int,
        payload: BloodDonationCreate,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    blood_donation = BloodDonation(
        pet_id=pet_id,
        amount=payload.amount,
        date=payload.date,
    )
    db.add(blood_donation)
    await db.commit()
    await db.refresh(
        blood_donation,
        ["pet"],
    )
    await db.refresh(
        blood_donation.pet,
        ["id", "owner"],
    )

    return db_blood_donation_to_blood_donation_dto(blood_donation)


@router.post(
    "/{blood_donation_id}/pet/{pet_id}", response_model=BloodDonationResponseDto
)
async def create_response_to_blood_request(
        blood_donation_id: int,
        pet_id: int,
        blood_response: BloodDonationResponseCreate,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    db_blood_response = BloodDonationResponse(
        blood_donation_id=blood_donation_id,
        msg=blood_response.msg,
        amount=blood_response.amount,
        pet_id=pet_id,
    )

    db.add(db_blood_response)
    await db.commit()
    await db.refresh(db_blood_response, ["pet", "blood_donation"])
    await db.refresh(
        db_blood_response.pet,
        ["id", "owner"],
    )
    await db.refresh(db_blood_response.blood_donation, ["id", "pet"])
    await db.refresh(db_blood_response.blood_donation.pet,
                     ["id", "owner"])

    return db_blood_donation_response_to_blood_donation_response_dto(db_blood_response)


# Endpoint to get all responses for a blood donation request
@router.get(
    "/response/{blood_donation_id}", response_model=List[BloodDonationResponseDto]
)
async def get_responses_for_blood_donation_request(
        blood_donation_id: int,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    stmt = sa.select(BloodDonationResponse).options(
        orm.selectinload(BloodDonationResponse.pet),
        orm.selectinload(BloodDonationResponse.blood_donation),
    ).where(BloodDonationResponse.blood_donation_id == blood_donation_id)

    res = []
    for t in (await db.execute(stmt)).all():
        db_blood_response = t[0]
        await db.refresh(db_blood_response, ["pet", "blood_donation"])
        await db.refresh(
            db_blood_response.pet,
            ["id", "owner"],
        )
        await db.refresh(db_blood_response.blood_donation, ["id", "pet"])
        await db.refresh(db_blood_response.blood_donation.pet,
                         ["id", "owner"])
        res.append(db_blood_response)

    return db_blood_donation_responses_to_blood_donation_response_dtos(res)


@router.delete("/{blood_donation_id}")
async def delete_blood_donation(blood_donation_id: int, db: AsyncSession = Depends(get_session),
                                current_user: User = Depends(get_current_user)):
    row = await db.execute(
        sa.select(BloodDonation).options(orm.selectinload(BloodDonation.blood_donation_response)).where(
            BloodDonation.id == blood_donation_id))
    row = row.scalar_one_or_none()
    if row:
        for t in row.blood_donation_response:
            await db.delete(t)
        await db.delete(row)
        await db.commit()
        return fastapi.Response(status_code=204)
    else:
        return fastapi.Response(status_code=400)
