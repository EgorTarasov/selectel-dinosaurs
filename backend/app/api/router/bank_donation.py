from fastapi import APIRouter, Depends, HTTPException, Form, Query, Body, status
from sqlalchemy.ext.asyncio import AsyncSession
import typing as tp
import sqlalchemy as sa
import datetime as dt


from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user, UserTokenData
from ..schemas import BankDonation, BankDonationResponse
from ...models import Bank, BankDonation as BankDonationModel
from ...settings import settings

router = APIRouter(prefix="/bank_donation")


@router.post("/", response_model=BankDonationResponse)
async def create_bank_donation(
    request: BankDonation,
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(Bank).where(Bank.id == request.bank_id)
    bank: Bank | None = (await db.execute(stmt)).scalar_one_or_none()

    if bank is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND)
    if request.animal_type == "dog":
        if request.blood_type not in bank.dog_storage.keys():
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, "Invalid blood type for dogs"
            )
        bank.dog_storage[request.blood_type] += request.count
    elif request.animal_type == "cat":
        if request.blood_type not in bank.cat_storage.keys():
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, "Invalid blood type for cats"
            )
        bank.cat_storage[request.blood_type] += request.count
    else:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid animal type")
    # merge datetime data with time from request.time
    request_datetime = dt.datetime.combine(
        request.date, dt.datetime.strptime(request.time, "%H:%M").time()
    )
    record = BankDonationModel(
        date=request_datetime,
        count=request.count,
        animal_type=request.animal_type,
        blood_type=request.blood_type,
        user_id=current_user.user_id,
        bank_id=request.bank_id,
    )
    db.add(record)
    await db.commit()
    return BankDonationResponse.model_validate(
        {
            "id": record.id,
            "date": record.date.isoformat(),
            "animal_type": record.animal_type,
            "blood_type": record.blood_type,
            "count": record.count,
        }
    )


@router.get("/", response_model=tp.List[BankDonationResponse])
async def get_users_donations(
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(BankDonationModel).where(
        BankDonationModel.user_id == current_user.user_id
    )
    records = (await db.execute(stmt)).scalars().all()
    return [
        BankDonationResponse.model_validate(
            {
                "id": record.id,
                "date": record.date.isoformat(),
                "animal_type": record.animal_type,
                "blood_type": record.blood_type,
                "count": record.count,
            }
        )
        for record in records
    ]


@router.get("/{bank_id}", response_model=tp.List[BankDonationResponse])
async def get_bank_donations(
    bank_id: int,
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(BankDonationModel).where(BankDonationModel.bank_id == bank_id)
    records = (await db.execute(stmt)).scalars().all()
    return [
        BankDonationResponse.model_validate(
            {
                "id": record.id,
                "date": record.date.isoformat(),
                "animal_type": record.animal_type,
                "blood_type": record.blood_type,
                "count": record.count,
            }
        )
        for record in records
    ]
