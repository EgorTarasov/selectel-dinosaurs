import typing as tp
import hashlib

from fastapi import File, UploadFile
from ..settings import settings
import aiofiles


def get_image_name(
    user_id: int, _type: tp.Literal["profile", "pet"], file_type: str
) -> str:

    return hashlib.md5(f"{_type}_{user_id}".encode()).hexdigest() + f".{file_type}"


async def save_image(
    file: UploadFile, user_id: int, _type: tp.Literal["profile", "pet"]
) -> str:
    """Save image to the filesystem and return the image name

    Args:
        user_id (int):
        _type str: тип изображения (profile, pet)
        filename (str): имя исходного файла

    Returns:
        str: путь до файла в сети
    """
    if file.filename:
        file_type = file.filename.split(".")[-1]
        file_name = get_image_name(user_id, _type, file_type)
        async with aiofiles.open(
            f"{settings.static_dir}/{file_name}", "wb"
        ) as out_file:
            while content := await file.read(1024):
                await out_file.write(content)

        return f"{settings.domain}/{settings.static_dir}/{file_name}"
    raise ValueError("No file name")
