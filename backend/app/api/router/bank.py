from fastapi import APIRouter, Depends, HTTPException, Form, Query
from sqlalchemy.ext.asyncio import AsyncSession
import typing as tp
import sqlalchemy as sa
import datetime as dt
from typing import List

from random import randint
from ..serializers.bank import db_bank_to_bank_dto
from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user, UserTokenData
from ..schemas import BankDto, QueryFilters
from ...models import Bank

router = APIRouter(prefix="/banks")


@router.get("/", response_model=List[BankDto])
async def get_all_blood_donations(
    filters: QueryFilters = Depends(),
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    print(
        filters.city,
        filters.amount,
        filters.blood_type,
        filters.due_date,
        filters.pet_type,
    )
    if filters.city is None:
        stmt = (
            sa.select(Bank)
            .where(Bank.amount >= filters.amount)
            .order_by(Bank.price_per_mil)
        )
    else:
        stmt = (
            sa.select(Bank)
            .where(
                sa.and_(
                    Bank.address.ilike(f"%{filters.city}%"),
                    (Bank.amount >= filters.amount),
                )
            )
            .order_by(Bank.price_per_mil)
        )

    banks = (await db.execute(stmt)).all()

    return [db_bank_to_bank_dto(bank[0]) for bank in banks]


@router.post("/", response_model=BankDto)
async def create_bank(
    name: str = Form(...),
    address: str = Form(...),
    price_per_mil: int = Form(...),
    phone: tp.Optional[str] = Form(None),
    link: tp.Optional[str] = Form(None),
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):

    db_bank = Bank(
        name=name,
        city=address.split(",")[-2].strip(),
        address=address,
        price_per_mil=price_per_mil,
        amount=randint(5, 20) * 100,
        phone=phone,
        link=link,
    )
    db.add(db_bank)
    await db.commit()
    return db_bank_to_bank_dto(db_bank)
    # return BankDto.model_validate(
    #     {
    #         "id": db_bank.id,
    #         "name": db_bank.name,
    #         "city": db_bank.city,
    #         "address": db_bank.address,
    #         "pricePerMil": db_bank.price_per_mil,
    #         "amountOfBlood": db_bank.amount,
    #     }
    # )
