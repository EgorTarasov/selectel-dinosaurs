from re import L
import typing as tp
from pydantic import BaseModel, Field, ConfigDict


UserRoles = tp.Literal["user", "admin"]


# class UserRole(BaseModel):
#     id: int = Field(..., alias="id")
#     name: str = Field()

#     model_config = ConfigDict(
#         from_attributes=True,
#     )


class User(BaseModel):
    email: str = Field(..., examples=["test@test.com"])


class UserLogin(BaseModel):
    email: str = Field(..., examples=["test@test.com"])
    password: str = Field(..., examples=["Test123456"])


class UserCreate(BaseModel):
    # first_name: str = Field(..., examples=["Ivan"])
    # last_name: str = Field(..., examples=["Ivanov"])
    # middle_name: str = Field(..., examples=["Ivanovich"])
    email: str = Field(..., examples=["test@test.com"])
    password: str = Field(..., examples=["Test123456"])
    # role: tp.Annotated[str, UserRoles] = Field("user", examples=["user", "admin"])


class UserContactGroup(BaseModel):
    hidden: bool = Field(False)
    phone: tp.Optional[str] = Field(...)
    email: tp.Optional[str] = Field(...)


class UserUpdate(BaseModel):
    email: str = Field(...)
    contact_group: UserContactGroup = Field(...)
    first_name: tp.Optional[str] = Field(...)
    middle_name: tp.Optional[str] = Field(...)
    last_name: tp.Optional[str] = Field(...)
    city: tp.Optional[str] = Field(...)
    wishes: tp.Optional[str] = Field(..., description="Предпочтения за донацию")
    available_weekends_only: bool = Field(True)
    avaliable_time: tp.List[tp.Tuple[str, str]] = Field(
        ..., description="Время доступности", examples=[("10:00", "18:00")]
    )


class UserDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., examples=[1])
    email: str = Field(...)
    contact_group: UserContactGroup = Field(...)
    first_name: tp.Optional[str] = Field(None)
    middle_name: tp.Optional[str] = Field(None)
    last_name: tp.Optional[str] = Field(...)
    city: tp.Optional[str] = Field(None)
    vkid: tp.Optional[int] = Field(None)
    wishes: tp.Optional[str] = Field(None, description="Предпочтения за донацию")
    avatar: tp.Optional[str] = Field(None)
    available_weekends_only: bool = Field(...)
    avaliable_time: tp.List[tp.Tuple[str, str]] = Field(
        ..., description="Время доступности", examples=[("10:00", "18:00")]
    )
