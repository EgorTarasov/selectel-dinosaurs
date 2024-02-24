import typing as tp
from pydantic import BaseModel, Field, ConfigDict


class BankRequest(BaseModel):
    """
    реципиент
    { animal_type: 'dog', blood_type: 'DEA_1_2', count: 213, bank: 4 }
    """

    animal_type: tp.Annotated[str, tp.Literal["cat", "dog"]] = Field(...)
    blood_type: str = Field(...)
    count: int = Field(...)
    bank_id: int = Field(..., alias="bank")


class BankRequestResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    date: str
    animal_type: str
    blood_type: str
    count: int
