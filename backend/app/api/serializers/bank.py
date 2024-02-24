from ...models import Bank
from ..schemas import BankDto, BankResponse


def db_bank_to_bank_response(bank: Bank, amount: int) -> BankResponse:
    return BankResponse.model_validate(
        {
            "id": bank.id,
            "name": bank.name,
            "address": bank.address,
            "price": bank.price_per_mil * amount,
            "link": bank.link,
            "dogStorage": bank.dog_storage,
            "catStorage": bank.cat_storage,
            "advantages": bank.advantages,
        }
    )


def db_bank_to_bank_dto(bank: Bank) -> BankDto:
    return BankDto.model_validate(
        {
            "id": bank.id,
            "name": bank.name,
            "address": bank.address,
            "longitude": bank.longitude,
            "latitude": bank.latitude,
            "pricePerMil": bank.price_per_mil,
            "advantages": bank.advantages,
            "phone": bank.phone,
            "link": bank.link,
            "dogStorage": bank.dog_storage,
            "catStorage": bank.cat_storage,
        }
    )
