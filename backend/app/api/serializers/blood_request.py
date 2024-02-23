from ...models import BloodRequest, BloodRequestResponse
from ..schemas import BloodRequestDto, BloodRequestResponseDto
from typing import List


async def db_blood_request_to_blood_request_dto(db_blood_request: BloodRequest) -> BloodRequestDto:
    from .pet import db_pet_to_pet_dto
    return BloodRequestDto(
        id=db_blood_request.id,
        amount=db_blood_request.amount,
        date=db_blood_request.created_at,
        due_date=db_blood_request.due_date,
        pet=db_pet_to_pet_dto(db_blood_request.pet, is_full=False),
    )


async def db_blood_requests_to_blood_request_dtos(db_blood_requests: List[BloodRequest]) -> List[BloodRequestDto]:
    return [await db_blood_request_to_blood_request_dto(db_blood_request) for db_blood_request in db_blood_requests]


async def db_blood_request_response_to_blood_request_response_dto(
        db_blood_request_response: BloodRequestResponse) -> BloodRequestResponseDto:
    from .pet import db_pet_to_pet_dto
    return BloodRequestResponseDto(
        id=db_blood_request_response.id,
        blood_request=await db_blood_request_to_blood_request_dto(
            db_blood_request_response.db_blood_request),
        msg=db_blood_request_response.msg,
        amount=db_blood_request_response.amount,
        pet=await db_pet_to_pet_dto(db_blood_request_response.pet, is_full=False)
    )


async def db_blood_request_responses_to_blood_request_response_dtos(
        db_blood_request_responses: List[BloodRequestResponse]) -> List[BloodRequestResponseDto]:
    return [await db_blood_request_response_to_blood_request_response_dto(db_blood_request_response) for
            db_blood_request_response in
            db_blood_request_responses]
