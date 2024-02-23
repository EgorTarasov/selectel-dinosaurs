import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .base import Base, TimestampMixin
from .pet import Pet  # Import the Pet class from the same module or adjust the import path


class Response(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    pet_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("pets.id"))
    proposal_id: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("proposals.id"))
    msg: Mapped[str] = mapped_column(sa.Text)
    amount: Mapped[int] = mapped_column(sa.Integer)

    pet: Mapped[Pet] = relationship("Pet", back_populates="responses")

    def __repr__(self) -> str:
        return f"<Response {self.id} {self.msg} {self.amount}>"
