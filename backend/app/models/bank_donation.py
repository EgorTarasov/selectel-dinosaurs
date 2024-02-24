from .base import Base, TimestampMixin
import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, relationship, mapped_column

# реципиент
# {animal_type: "dog", blood_type: "DEA_1_2", count: 213, bank: 4}


class BankDonation(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    date: Mapped[dt.datetime] = mapped_column(
        sa.DateTime,
        nullable=False,
        default=dt.datetime.now,
        server_default=sa.func.now(),
    )

    count: Mapped[int] = mapped_column(sa.Integer, nullable=False)
    animal_type: Mapped[str] = mapped_column(sa.Text, nullable=False)  # "dog" or "cat"
    blood_type: Mapped[str] = mapped_column(sa.Text, nullable=False)  # "DEA_1_1"

    user_id: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("users.id", ondelete="CASCADE")
    )
    bank_id: Mapped[int] = mapped_column(
        sa.Integer, sa.ForeignKey("banks.id", ondelete="CASCADE")
    )
    bank = relationship("Bank", back_populates="donations")
    # recipient = relationship("Recipient", back_populates="donations")

    def __repr__(self) -> str:
        return f"<BankDonation {self.id} {self.count} {self.date} {self.animal_type} {self.blood_type} {self.bank_id}>"
