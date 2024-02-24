from typing_extensions import TypedDict

from httpx import request
from .base import Base, TimestampMixin
from sqlalchemy.dialects.postgresql import JSON, ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship
import sqlalchemy as sa


class DogBloodStorage(TypedDict):
    DEA_1_1: int
    DEA_1_2: int
    DEA_3: int
    DEA_4: int
    DEA_5: int
    DEA_7: int


class CatBloodStorage(TypedDict):
    A: int
    B: int
    AB: int


class Bank(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(sa.String(50), nullable=False)
    address: Mapped[str] = mapped_column(sa.String(100), nullable=False)
    price_per_mil: Mapped[int] = mapped_column(sa.Integer, nullable=False)
    link: Mapped[str] = mapped_column(sa.String(100), nullable=True)
    phone: Mapped[str] = mapped_column(sa.String(20), nullable=True)
    longitude: Mapped[float] = mapped_column(sa.Float, nullable=True)
    latitude: Mapped[float] = mapped_column(sa.Float, nullable=True)
    advantages: Mapped[list[str]] = mapped_column(ARRAY(sa.Text), nullable=True)
    dog_storage: Mapped[DogBloodStorage] = mapped_column(
        JSON,
        nullable=False,
        default={
            "DEA_1_1": 0,
            "DEA_1_2": 0,
            "DEA_3": 0,
            "DEA_4": 0,
            "DEA_5": 0,
            "DEA_7": 0,
        },
    )
    cat_storage: Mapped[CatBloodStorage] = mapped_column(
        JSON, nullable=False, default={"A": 0, "B": 0, "AB": 0}
    )

    requests = relationship("BankRequest", back_populates="bank")
    donations = relationship("BankDonation", back_populates="bank")

    def __repr__(self) -> str:
        return f"<Bank {self.id} {self.name} {self.address} {self.price_per_mil} {self.phone} {self.link} {self.longitude} {self.latitude} {self.advantages} {self.dog_storage} {self.cat_storage}>"
