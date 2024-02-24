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
    selected_blood_donation_response_id: Mapped[sa.Integer] = mapped_column(sa.Integer, nullable=True)

    blood_donation_response = relationship("BloodDonationResponse", back_populates="blood_donation")
    pet = relationship("Pet", back_populates="blood_donations")

    def __repr__(self) -> str:
        return f"<BloodDonation {self.id} {self.amount} {self.date}>"


class BloodDonationResponse(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    blood_donation_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey('blood_donations.id', ondelete='CASCADE'),
                                                   index=True)
    msg: Mapped[str] = mapped_column(sa.String, nullable=False)
    amount: Mapped[int] = mapped_column(sa.Integer, nullable=False)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey('pets.id', ondelete='CASCADE'), index=True)

    blood_donation: Mapped[BloodDonation] = relationship("BloodDonation", back_populates="blood_donation_response")
    pet: Mapped['Pet'] = relationship("Pet", back_populates="blood_donation_responses")

    def __repr__(self) -> str:
        return f"<BloodDonationResponse {self.id} {self.amount} {self.created_at}>"
