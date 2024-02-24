from .base import Base, TimestampMixin
from .user import User
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship


class ResetCode(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)
    code: Mapped[str] = mapped_column(sa.Text)
    user_id: Mapped[int] = mapped_column(sa.ForeignKey("users.id"))
    user: Mapped[User] = relationship("User")
