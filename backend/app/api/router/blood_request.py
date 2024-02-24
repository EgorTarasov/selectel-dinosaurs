import fastapi
from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import orm
import sqlalchemy as sa
from typing import List, Optional
from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user
from ..schemas import (
    BloodRequestCreate,
    BloodRequestDto,
    BloodRequestResponseCreate,
    BloodRequestResponseDto,
    BloodRequestUpdate,
    QueryFilters,
)
from ...models import User, BloodRequest, BloodRequestResponse
from ..serializers import (
    db_blood_request_to_blood_request_dto,
    db_blood_request_response_to_blood_request_response_dto,
    db_blood_request_responses_to_blood_request_response_dtos,
    db_blood_requests_to_blood_request_dtos,
)

router = APIRouter(prefix="/blood-requests")


@router.get("/", response_model=List[BloodRequestDto])
async def get_all_blood_requests(
        filters: QueryFilters = Depends(),
        db: AsyncSession = Depends(get_session),
):  # -> list[Any]:
    stmt = sa.select(BloodRequest).options(orm.selectinload(BloodRequest.pet))

    res = []
    for t in (await db.execute(stmt)).all():
        db_blood_request = t[0]

        await db.refresh(db_blood_request, ["pet"])
        await db.refresh(db_blood_request.pet, ["owner"])

        if filters.city and not (filters.city.lower() in db_blood_request.pet.owner.city.lower()):
            continue

        if filters.pet_type and filters.pet_type != "any" and filters.pet_type != db_blood_request.pet.type:
            continue

        if filters.amount and filters.amount < db_blood_request.amount:
            continue

        res.append(db_blood_request)

    return db_blood_requests_to_blood_request_dtos(res)


@router.post("/pet/{pet_id}", response_model=BloodRequestDto)
async def create_blood_request_request(
        pet_id: int,
        payload: BloodRequestCreate,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    blood_request = BloodRequest(
        pet_id=pet_id,
        amount=payload.amount,
        due_date=payload.due_date,
        msg=payload.msg,
        address=payload.address,
    )
    db.add(blood_request)
    await db.commit()
    await db.refresh(
        blood_request,
        ["pet"],
    )
    await db.refresh(
        blood_request.pet,
        ["id", "owner"],
    )

    return db_blood_request_to_blood_request_dto(blood_request)


@router.post("/{blood_request_id}/pet/{pet_id}", response_model=BloodRequestResponseDto)
async def create_response_to_blood_request(
        blood_request_id: int,
        pet_id: int,
        blood_response: BloodRequestResponseCreate,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    db_blood_response = BloodRequestResponse(
        blood_request_id=blood_request_id,
        msg=blood_response.msg,
        amount=blood_response.amount,
        pet_id=pet_id,
    )

    db.add(db_blood_response)
    await db.commit()
    await db.refresh(db_blood_response, ["pet", "blood_request"])
    await db.refresh(
        db_blood_response.pet,
        ["id", "owner"],
    )
    await db.refresh(db_blood_response.blood_request, ["id", "pet"])
    await db.refresh(db_blood_response.blood_request.pet, ["id", "owner"])

    return db_blood_request_response_to_blood_request_response_dto(db_blood_response)


# Endpoint to get all responses for a blood donation request
@router.get(
    "/response/{blood_request_id}", response_model=List[BloodRequestResponseDto]
)
async def get_responses_for_blood_request_request(
        blood_request_id: int,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    stmt = (
        sa.select(BloodRequestResponse)
        .options(
            orm.selectinload(BloodRequestResponse.pet),
            orm.selectinload(BloodRequestResponse.blood_request),
        )
        .where(BloodRequestResponse.blood_request_id == blood_request_id)
    )

    res = []
    for t in (await db.execute(stmt)).all():
        db_blood_response = t[0]
        await db.refresh(db_blood_response, ["pet", "blood_request"])
        await db.refresh(
            db_blood_response.pet,
            ["id", "owner"],
        )
        await db.refresh(db_blood_response.blood_request, ["id", "pet"])
        await db.refresh(db_blood_response.blood_request.pet, ["id", "owner"])
        res.append(db_blood_response)

    return db_blood_request_responses_to_blood_request_response_dtos(res)


@router.delete("/{blood_request_id}")
async def delete_blood_request(
        blood_request_id: int,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user),
):
    row = await db.execute(
        sa.select(BloodRequest)
        .options(orm.selectinload(BloodRequest.blood_request_response))
        .where(BloodRequest.id == blood_request_id)
    )
    row = row.scalar_one_or_none()
    if row:
        for t in row.blood_request_response:
            await db.delete(t)
        await db.delete(row)
        await db.commit()
        return fastapi.Response(status_code=204)
    else:
        return fastapi.Response(status_code=400)


@router.put("/{blood_request_id}", response_model=BloodRequestDto)
async def update_blood_request(
        blood_request_id: int,
        payload: BloodRequestUpdate,
        db: AsyncSession = Depends(get_session),
        current_user: User = Depends(get_current_user)
):
    stmt = sa.select(BloodRequest).where(BloodRequest.id == blood_request_id)
    db_blood_request = (await db.execute(stmt)).scalar_one_or_none()
    if not db_blood_request:
        raise HTTPException(404, detail="Blood Donation not found")

    if payload.amount is not None:
        db_blood_request.amount = payload.amount
    if payload.due_date is not None:
        db_blood_request.due_date = payload.due_date

    if payload.msg is not None:
        db_blood_request.msg = payload.msg

    if payload.address is not None:
        db_blood_request.address = payload.address

    # Сохраняем изменения и обновляем объект с БД
    await db.commit()
    await db.refresh(db_blood_request, ["pet"])
    await db.refresh(db_blood_request.pet, ["id", "owner"])

    return db_blood_request_to_blood_request_dto(db_blood_request)
