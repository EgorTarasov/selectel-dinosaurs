import typing as tp
import datetime as dt
from pydantic import BaseModel, Field, ConfigDict


class QueryFilters(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    blood_type: tp.Optional[str] = Field(None, min_length=1, max_length=7)
    amount: tp.Optional[int] = Field(0, ge=0)
    city: tp.Optional[str] = Field(None, min_length=3, max_length=50)
    pet_type: tp.Literal["dog", "cat"] = Field(None)
    due_date: tp.Optional[dt.datetime] = Field(None)
