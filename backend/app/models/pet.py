import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin
from .user import User  # Import the User class from the same module or adjust the import path


class Pet(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    type: Mapped[str] = mapped_column(sa.Text)
    breed: Mapped[str] = mapped_column(sa.Text)
    avatar: Mapped[str] = mapped_column(sa.Text)
    name: Mapped[str] = mapped_column(sa.Text)
    date_of_birth: Mapped[dt.datetime] = mapped_column(sa.DateTime)
    weight: Mapped[float] = mapped_column(sa.Float)
    able_to_donate: Mapped[bool] = mapped_column(sa.Boolean)
    owner_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))

    owner: Mapped[User] = relationship("User", back_populates="pets")

    def __repr__(self) -> str:
        return f"<Pet {self.id} {self.name} {self.type} {self.breed} {self.date_of_birth}>"
