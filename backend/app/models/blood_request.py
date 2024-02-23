import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin


class BloodRequest(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("pets.id"))
    amount: Mapped[int] = mapped_column(sa.Integer)
    due_date: Mapped[dt.datetime] = mapped_column(sa.DateTime)

    pet = relationship("Pet", back_populates="blood_requests")

    def __repr__(self) -> str:
        return f"<BloodRequest {self.id} {self.amount} {self.due_date}>"


class BloodRequestResponse(Base, TimestampMixin):
    __tablename__ = 'blood_request_responses'

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    blood_request_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey('blood_requests.id', ondelete='CASCADE'),
                                                  index=True)
    msg: Mapped[str] = mapped_column(sa.String, nullable=False)
    amount: Mapped[int] = mapped_column(sa.Integer, nullable=False)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey('pets.id', ondelete='CASCADE'), index=True)

    blood_request: Mapped[BloodRequest] = relationship("BloodRequest", back_populates="blood_request_response")
    pet: Mapped['Pet'] = relationship("Pet", back_populates="blood_request_responses")

    def __repr__(self) -> str:
        return f"<BloodRequestResponse {self.id} {self.amount} {self.created_at}>"
