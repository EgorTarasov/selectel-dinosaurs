from ...models import User
from ..schemas import UserDto


def db_user_to_user_dto(db_user: User, requests=[], donations=[]) -> UserDto:
    return UserDto.model_validate(
        {
            "id": db_user.id,
            "first_name": db_user.first_name,
            "last_name": db_user.last_name,
            "middle_name": db_user.middle_name,
            "email": db_user.email,
            "contact_group": {
                "hidden": db_user.hide_contact_info,
                "phone": db_user.phone,
                "email": db_user.contact_email,
            },
            "vkid": db_user.vkid,
            "wishes": db_user.wishes,
            "available_weekends_only": db_user.available_weekends_only,
            "avatar": db_user.avatar,
            "avaliable_time": db_user.avaliable_time if db_user.avaliable_time else [],
            "requests": requests,
            "donations": donations,
        }
    )
