from .base import Base
import sqlalchemy as sa
import datetime as dt
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import relationship, Mapped, mapped_column


class SocialMediaPost(Base):
    """Processed social media post. for display on the website."""

    id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)
    vkid: Mapped[int] = mapped_column(sa.Integer, index=True)
    link: Mapped[str] = mapped_column(sa.Text)
    text: Mapped[str] = mapped_column(sa.Text)
    summary: Mapped[str] = mapped_column(sa.Text)
    images: Mapped[list[str]] = mapped_column(ARRAY(sa.Text))
    date: Mapped[dt.datetime] = mapped_column(sa.DateTime)
    uploaded_by: Mapped[int] = mapped_column(sa.Integer, sa.ForeignKey("users.id"))
    uploaded_at: Mapped[dt.datetime] = mapped_column(
        sa.DateTime, default=dt.datetime.now
    )
