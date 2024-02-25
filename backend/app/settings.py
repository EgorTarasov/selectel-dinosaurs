import typing as tp
from pydantic import EmailStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    api_prefix: str = "/api"

    max_upload_size: int = 5 * 1024 * 1024  # 5MB

    postgres_host: str
    postgres_port: int = 5432
    postgres_db: str

    mail_user: EmailStr
    mail_password: str
    mail_host: str
    mail_port: int

    yandex_api_token: str
    postgres_user: str
    postgres_password: str

    # celery settings
    rabbitmq_default_user: str
    rabbitmq_default_pass: str
    rabbitmq_host: str = "localhost"
    rabbitmq_port: int = 5672

    domain: str = "localhost"
    frontend_domain: str
    static_dir: str = "static"
    vk_client_id: str
    vk_secure_token: str
    vk_service_token: str
    vk_redirect_uri: str = "http://localhost:5173/login"

    vk_token_url: str = (
        "https://oauth.vk.com/access_token?client_id={client_id}&client_secret={vk_secure_token}&redirect_uri={redirect_uri}&code={code}"
    )
    vk_base_url: str = "https://api.vk.ru/method"
    model_config = SettingsConfigDict(env_file_encoding="utf-8", env_file=".env")

    def build_postgres_dsn(self) -> str:
        return (
            "postgresql+asyncpg://"
            f"{self.postgres_user}:{self.postgres_password}"
            f"@{self.postgres_host}:{self.postgres_port}/{self.postgres_db}"
        )

    @property
    def rabbitmq_url(self) -> str:
        return f"amqp://{self.rabbitmq_default_user}:{self.rabbitmq_default_pass}@{self.rabbitmq_host}:{self.rabbitmq_port}"


settings: tp.Final[Settings] = Settings()  # type: ignore
