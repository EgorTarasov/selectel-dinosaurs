from .base import Base, TimestampMixin
import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, relationship, mapped_column


class BankRequest(Base, TimestampMixin):
    """
    {

      date: new Date('2024-02-28T21:00:00.000Z'),

      time: '11:00',

      animal_type: 'dog',

      blood_type: 'DEA_7',

      count: 0,

      bank: 1

    }

    """

    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    date: Mapped[dt.datetime] = mapped_column(sa.DateTime, nullable=False)

    count: Mapped[int] = mapped_column(sa.Integer, nullable=False)
    animal_type: Mapped[str] = mapped_column(
        sa.String(10), nullable=False
    )  # "dog" or "cat"
    blood_type: Mapped[str] = mapped_column(sa.String(10), nullable=False)  # "DEA_1_1"

    user_id: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE")
    )
    bank_id: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("banks.id", ondelete="CASCADE")
    )
    bank = relationship("Bank", back_populates="requests")
