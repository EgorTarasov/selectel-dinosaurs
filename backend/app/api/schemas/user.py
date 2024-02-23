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


class UserUpdate(BaseModel):
    email: str = Field(...)
    first_name: str = Field(...)
    middle_name: str = Field(...)
    last_name: str = Field(...)
    city: str = Field(...)


class UserDto(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int = Field(..., examples=[1])
    first_name: str = Field(..., examples=["Ivan"])
    last_name: str = Field(..., examples=["Ivanov"])
    email: str = Field(..., examples=["test@]test.com"])
    avatar: tp.Optional[str] = Field(
        ..., examples=["http://localhost:8000/static/avatars/1.png"]
    )
    role: tp.Annotated[str, UserRoles] = Field(..., examples=["user"])
