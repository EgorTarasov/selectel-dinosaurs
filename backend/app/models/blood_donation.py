import datetime as dt
import sqlalchemy as sa
import typing as tp
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin


class BloodDonation(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("pets.id"))
    amount: Mapped[int] = mapped_column(sa.Integer)
    date: Mapped[dt.datetime] = mapped_column(sa.DateTime)

    pet = relationship("Pet", back_populates="blood_donations")

    def __repr__(self) -> str:
        return f"<BloodDonation {self.id} {self.amount} {self.date}>"
