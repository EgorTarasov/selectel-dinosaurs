from typing import Union

from pydantic import BaseModel, Field, ConfigDict


class Token(BaseModel):
    access_token: str = Field(
        ...,
    )
    token_type: str = Field("Bearer")

    model_config = ConfigDict(from_attributes=True)


class TokenData(BaseModel):
    email: Union[str, None]
