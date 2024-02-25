import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin
from .pet import (
    Pet,
)  # Import the Pet class from the same module or adjust the import path


class Vaccine(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("pets.id", ondelete='CASCADE'))
    name: Mapped[str] = mapped_column(sa.Text)
    date: Mapped[dt.datetime] = mapped_column(sa.DateTime)
    expire_date: Mapped[dt.datetime] = mapped_column(sa.DateTime)

    pet = relationship("Pet", back_populates="vaccines")

    def __repr__(self) -> str:
        return f"<Vaccine {self.id} {self.name} {self.date} {self.expire_date}>"
