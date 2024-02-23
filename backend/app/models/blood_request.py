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
