import typing as tp
import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin


class Pet(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    type: Mapped[str] = mapped_column(sa.Text)
    breed: Mapped[str] = mapped_column(sa.Text)
    avatar: Mapped[str] = mapped_column(sa.Text)
    name: Mapped[str] = mapped_column(sa.Text)
    age: Mapped[int] = mapped_column(sa.Integer)
    weight: Mapped[float] = mapped_column(sa.Float)
    able_to_donate: Mapped[bool] = mapped_column(sa.Boolean)
    owner_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))

    owner = relationship("User", back_populates="pets")
    vaccines = relationship("Vaccine", back_populates="pet")
    blood_donations = relationship("BloodDonation", back_populates="pet")
    blood_requests = relationship("BloodRequest", back_populates="pet")
    blood_donation_responses = relationship(
        "BloodDonationResponse", back_populates="pet"
    )
    blood_request_responses = relationship("BloodRequestResponse", back_populates="pet")

    def __repr__(self) -> str:
        return f"<Pet {self.id} {self.name} {self.type} {self.breed} {self.age}>"
