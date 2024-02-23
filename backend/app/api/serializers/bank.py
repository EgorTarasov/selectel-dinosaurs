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
        }
    )


def db_bank_to_bank_dto(bank: Bank) -> BankDto:
    return BankDto.model_validate(
        {
            "id": bank.id,
            "name": bank.name,
            "address": bank.address,
            "city": bank.city,
            "pricePerMil": bank.price_per_mil,
            "amountOfBlood": bank.amount,
            "phone": bank.phone,
            "link": bank.link,
        }
    )
