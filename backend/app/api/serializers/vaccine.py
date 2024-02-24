from ...models import Vaccine
from ..schemas import VaccineDto
from typing import List


def db_vaccine_to_vaccine_dto(db_vaccine: Vaccine) -> VaccineDto:
    from .pet import db_pet_to_pet_dto

    return VaccineDto(
        id=db_vaccine.id,
        name=db_vaccine.name,
        date=db_vaccine.date,
        expire_date=db_vaccine.expire_date,
    )


def db_vaccines_to_vaccine_dtos(db_vaccines: List[Vaccine]) -> List[VaccineDto]:
    return [db_vaccine_to_vaccine_dto(db_vaccine) for db_vaccine in db_vaccines]
