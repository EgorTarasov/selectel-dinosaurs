from .base import Base, TimestampMixin

from sqlalchemy.orm import Mapped, mapped_column
import sqlalchemy as sa


class Bank(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    name: Mapped[str] = mapped_column(sa.String(50), nullable=False)
    city: Mapped[str] = mapped_column(sa.String(50), nullable=False)
    address: Mapped[str] = mapped_column(sa.String(100), nullable=False)
    price_per_mil: Mapped[int] = mapped_column(sa.Integer, nullable=False)
    link: Mapped[str] = mapped_column(sa.String(100), nullable=True)
    phone: Mapped[str] = mapped_column(sa.String(20), nullable=True)
    amount: Mapped[int] = mapped_column(sa.Integer, nullable=False)

    def __repr__(self) -> str:
        return f"<Bank {self.id} {self.name} {self.address}>"
