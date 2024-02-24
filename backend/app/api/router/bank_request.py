from fastapi import APIRouter, Depends, HTTPException, Form, Query, Body, status
from sqlalchemy.ext.asyncio import AsyncSession
import typing as tp
import sqlalchemy as sa
import datetime as dt


from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user, UserTokenData
from ..schemas import BankRequest, BankRequestResponse
from ...models import Bank, BankRequest as BankRequestModel
from ...settings import settings

router = APIRouter(prefix="/bank_request")


@router.post("/", response_model=BankRequestResponse)
async def create_bank_request(
    request: BankRequest,
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
        bank.dog_storage[request.blood_type] -= request.count
    elif request.animal_type == "cat":
        if request.blood_type not in bank.cat_storage.keys():
            raise HTTPException(
                status.HTTP_400_BAD_REQUEST, "Invalid blood type for cats"
            )
        bank.cat_storage[request.blood_type] -= request.count
    else:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, "Invalid animal type")
    record = BankRequestModel(
        date=dt.datetime.now(),
        count=request.count,
        animal_type=request.animal_type,
        blood_type=request.blood_type,
        user_id=current_user.user_id,
        bank_id=request.bank_id,
    )
    db.add(record)
    await db.commit()
    return BankRequestResponse.model_validate(
        {
            "id": record.id,
            "date": record.date.isoformat(),
            "animal_type": record.animal_type,
            "blood_type": record.blood_type,
            "count": record.count,
        }
    )


@router.get("/", response_model=tp.List[BankRequestResponse])
async def get_users_requests(
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(BankRequestModel).where(
        BankRequestModel.user_id == current_user.user_id
    )
    requests = (await db.execute(stmt)).scalars().all()
    return [
        BankRequestResponse.model_validate(
            {
                "id": request.id,
                "date": request.date.isoformat(),
                "animal_type": request.animal_type,
                "blood_type": request.blood_type,
                "count": request.count,
            }
        )
        for request in requests
    ]


@router.get("/{bank_id}", response_model=tp.List[BankRequestResponse])
async def get_bank_requests(
    bank_id: int,
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    stmt = sa.select(BankRequestModel).where(BankRequestModel.bank_id == bank_id)
    requests = (await db.execute(stmt)).scalars().all()
    return [
        BankRequestResponse.model_validate(
            {
                "id": request.id,
                "date": request.date.isoformat(),
                "animal_type": request.animal_type,
                "blood_type": request.blood_type,
                "count": request.count,
            }
        )
        for request in requests
    ]
