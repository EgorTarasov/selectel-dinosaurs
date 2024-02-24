import typing as tp
import datetime as dt
import enum
from pydantic import BaseModel, Field, ConfigDict


def map_blood_type(blood_type: str, pet_type: str) -> str:
    """maps blood type to the correct format for the database"""
    if pet_type == "dog":
        match blood_type:
            case "DEA 1.1":
                return "DEA_1_1"
            case "DEA 1.2":
                return "DEA_1_2"
            case "DEA 3":
                return "DEA_3"
            case "DEA 4":
                return "DEA_4"
            case "DEA 5":
                return "DEA_5"
            case "DEA 7":
                return "DEA_7"

    elif pet_type == "cat":
        match blood_type:
            case "A":
                return "A"
            case "B":
                return "B"
            case "AB":
                return "AB"
    raise ValueError("Invalid blood type")


class QueryFilters(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    blood_type: tp.Optional[str] = Field(None, min_length=1, max_length=7)
    amount: tp.Optional[int] = Field(0, ge=0)
    city: tp.Optional[str] = Field(None, min_length=3, max_length=50)
    pet_type: tp.Literal["dog", "cat"] = Field(None)
    due_date: tp.Optional[dt.datetime] = Field(None)
