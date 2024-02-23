from ...models import User
from ..schemas import UserDto


async def db_user_to_user_dto(db_user: User) -> UserDto:
    return UserDto(
        id=db_user.id,
        first_name=db_user.first_name,
        last_name=db_user.last_name,
        email=db_user.email,
        avatar=db_user.avatar,
        role=db_user.role,
    )
