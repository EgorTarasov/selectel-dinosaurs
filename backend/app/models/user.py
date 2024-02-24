import datetime as dt
import sqlalchemy as sa
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import ARRAY

from .base import Base, TimestampMixin

from .pet import Pet


#  interface ContactGroup {
#     hidden: boolean;
#     value: string;
#   }

#   interface AvailableTime {
#     start: string;
#     end: string;
#   }

#   export interface Item {
#     id: number;
#     avatar: string | null;
#     first_name: string;
#     last_name: string;
#     middle_name: string;
#     phone: ContactGroup;
#     email: ContactGroup;
#     vk: ContactGroup;
#     telegram: ContactGroup;
#     wishes: string;
#     available_weekends_only: boolean;
#     available_time: AvailableTime[];
#   }


class User(Base, TimestampMixin):
    id: Mapped[int] = mapped_column(autoincrement=True, primary_key=True)

    first_name: Mapped[str] = mapped_column(sa.Text)
    last_name: Mapped[str] = mapped_column(sa.Text)
    middle_name: Mapped[str] = mapped_column(sa.Text, nullable=True)
    email: Mapped[str] = mapped_column(sa.Text, nullable=True, unique=True)
    password: Mapped[str] = mapped_column(sa.Text)
    role: Mapped[str] = mapped_column(sa.Text)  # user / moderator / admin
    hide_contact_info: Mapped[bool] = mapped_column(sa.Boolean, default=False)
    contact_email: Mapped[str] = mapped_column(sa.Text, nullable=True)
    phone: Mapped[str] = mapped_column(sa.Text, nullable=True)

    vkid: Mapped[int] = mapped_column(sa.Integer, nullable=True, unique=True)
    avatar: Mapped[str] = mapped_column(sa.Text, nullable=True)
    city: Mapped[str] = mapped_column(sa.Text, nullable=True)
    wishes: Mapped[str] = mapped_column(sa.Text, nullable=True)
    available_weekends_only: Mapped[bool] = mapped_column(sa.Boolean, default=False)
    avaliable_time: Mapped[list[tuple[str, str]]] = mapped_column(
        ARRAY(sa.String, dimensions=2), nullable=True
    )

    pets = relationship("Pet", back_populates="owner")

    # def decode_availability(self) -> list[dict[str, str]]:
    #     if not self.avaliable_time:
    #         return []
    #     return [ for start, end in self.avaliable_time]

    def __repr__(self) -> str:
        return f"<User {self.id} {self.first_name} {self.last_name} {self.email}>"


# user_group_association = sa.Table(
#     "user_group_association",
#     Base.metadata,
#     sa.Column("vk_user_id", sa.Integer, sa.ForeignKey("vk_users.id")),
#     sa.Column("vk_group_id", sa.Integer, sa.ForeignKey("vk_groups.id")),
# )


# class VkUser(Base, TimestampMixin):
#     id: Mapped[int] = mapped_column(sa.Integer, primary_key=True)

#     first_name: Mapped[str] = mapped_column(sa.Text)
#     last_name: Mapped[str] = mapped_column(sa.Text)
#     bdate: Mapped[dt.datetime] = mapped_column(sa.DateTime)
#     sex: Mapped[str] = mapped_column(sa.Text)
#     city: Mapped[str] = mapped_column(sa.Text)

#     photo_url: Mapped[str] = mapped_column(sa.Text)
#     groups: Mapped[list[VkGroup]] = relationship(
#         "VkGroup", secondary=user_group_association, backref="users"
#     )

#     def __repr__(self) -> str:
#         return f"<VkUser {self.id}>"
