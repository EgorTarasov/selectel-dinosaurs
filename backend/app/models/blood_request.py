import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin
from .pet import Pet


class BloodRequest(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("pets.id"))
    request_details: Mapped[str] = mapped_column(sa.Text)
    date_requested: Mapped[dt.datetime] = mapped_column(sa.DateTime)

    pet: Mapped[Pet] = relationship("Pet", back_populates="blood_requests")

    def __repr__(self) -> str:
        return f"<BloodRequest {self.id} {self.request_details} {self.date_requested}>"
