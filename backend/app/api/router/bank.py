from fastapi import APIRouter, Depends, HTTPException, Form, Query
from sqlalchemy.ext.asyncio import AsyncSession
import typing as tp
import sqlalchemy as sa
import datetime as dt
from typing import List

from random import randint
from yandex_geocoder import Client


from ..serializers.bank import db_bank_to_bank_dto
from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user, UserTokenData
from ..schemas import BankDto, QueryFilters, map_blood_type
from ...models import Bank, CatBloodStorage, DogBloodStorage
from ...settings import settings

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
    stmt = sa.select(Bank)
    if filters.city is not None:

        stmt.where(Bank.address.ilike(f"%{filters.city}%"))
    if (
        filters.blood_type is not None
        and filters.pet_type is not None
        and filters.amount is not None
        and filters.amount > 0
    ):
        blood_type = map_blood_type(filters.blood_type, filters.pet_type)
        if filters.pet_type == "dog":
            stmt = stmt.where(
                sa.cast(Bank.dog_storage[blood_type].astext, sa.Integer)
                >= filters.amount
            )
        elif filters.pet_type == "cat":
            stmt = stmt.where(
                sa.cast(Bank.cat_storage[blood_type].astext, sa.Integer)
                >= filters.amount
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
    client = Client(settings.yandex_api_token)
    longitude, lattitude = client.coordinates(address)
    print(longitude, lattitude)
    db_bank = Bank(
        name=name,
        address=address,
        price_per_mil=price_per_mil,
        phone=phone,
        link=link,
        longitude=longitude,
        latitude=lattitude,
    )
    db.add(db_bank)
    await db.commit()
    return db_bank_to_bank_dto(db_bank)


@router.put("/{bank_id}", response_model=BankDto)
async def update_store_values(
    bank_id: int,
    dog_storage: DogBloodStorage,
    cat_storage: CatBloodStorage,
    db: AsyncSession = Depends(get_session),
    current_user: UserTokenData = Depends(get_current_user),
):
    bank = await db.get(Bank, bank_id)
    if bank is None:
        raise HTTPException(status_code=404, detail="Bank not found")
    bank.dog_storage = dog_storage
    bank.cat_storage = cat_storage
    # save the changes
    print(bank.dog_storage, bank.cat_storage)
    # update the bank in the database
    await db.commit()
    test_bank = await db.get(Bank, bank_id)

    return db_bank_to_bank_dto(bank)
