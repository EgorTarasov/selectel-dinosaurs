from ...models import BloodDonation
from ..schemas import BloodDonationDto

def db_blood_donation_to_blood_donation_dto(db_blood_donation: BloodDonation) -> BloodDonationDto:
    return BloodDonationDto(
        id=db_blood_donation.id,
    amount=db_blood_donation.amount,
    date=
    pet: PetDto
    )