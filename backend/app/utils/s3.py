import typing as tp
import boto3

from ..settings import settings


def get_image_name(user_id: int, _type: tp.Literal["profile", "pet"]) -> str:
    # create a unique image name from user_id and type
    return f"{_type}_{user_id}.png"


def get_image_link(image_name: str) -> str:
    s3 = boto3.client(
        "s3",
        aws_access_key_id=settings.s3_access_key,
        aws_secret_access_key=settings.s3_secret_key,
        endpoint_url=settings.s3_host,
    )
    return s3.generate_presigned_url(
        "get_object",
        Params={"Bucket": settings.s3_bucket, "Key": image_name},
        ExpiresIn=8_640_000,
    )


def upload_image(image, image_name) -> None:
    s3 = boto3.client(
        "s3",
        aws_access_key_id=settings.s3_access_key,
        aws_secret_access_key=settings.s3_secret_key,
        endpoint_url=settings.s3_host,
    )
    s3.upload_fileobj(
        Fileobj=image,
        Bucket=settings.s3_bucket,
        Key=image_name,
        ExtraArgs={"ContentType": "image/png", "ACL": "public-read"},
        Callback=None,
        Config=None,
    )
