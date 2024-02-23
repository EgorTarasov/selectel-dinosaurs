from ...models import BloodDonation, BloodDonationResponse
from ..schemas import BloodDonationDto, BloodDonationResponseDto
from typing import List


def db_blood_donation_to_blood_donation_dto(db_blood_donation: BloodDonation) -> BloodDonationDto:
    from .pet import db_pet_to_pet_dto
    return BloodDonationDto(
        id=db_blood_donation.id,
        amount=db_blood_donation.amount,
        date=db_blood_donation.created_at,
        pet=db_pet_to_pet_dto(db_blood_donation.pet, is_full=False),
    )


def db_blood_donations_to_blood_donation_dtos(db_blood_donations: List[BloodDonation]) -> List[BloodDonationDto]:
    return [db_blood_donation_to_blood_donation_dto(db_blood_donation) for db_blood_donation in
            db_blood_donations]


def db_blood_donation_response_to_blood_donation_response_dto(
        db_blood_donation_response: BloodDonationResponse) -> BloodDonationResponseDto:
    from .pet import db_pet_to_pet_dto
    return BloodDonationResponseDto(
        id=db_blood_donation_response.id,
        blood_donation=db_blood_donation_to_blood_donation_dto(
            db_blood_donation_response.blood_donation),
        msg=db_blood_donation_response.msg,
        amount=db_blood_donation_response.amount,
        pet=db_pet_to_pet_dto(db_blood_donation_response.pet, is_full=False)
    )


def db_blood_donation_responses_to_blood_donation_response_dtos(
        db_blood_donation_responses: List[BloodDonationResponse]) -> List[BloodDonationResponseDto]:
    return [db_blood_donation_response_to_blood_donation_response_dto(db_blood_donation_response) for
            db_blood_donation_response in
            db_blood_donation_responses]
