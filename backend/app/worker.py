import typing as tp
from celery import Celery
from .settings import settings
from .utils.email import EmailClient
from .db import Database
from .models import User

# TODO: update .env.example

# TODO: send email on blood donation and response
# TODO: send email on blood request and response

celery = Celery(__name__, broker=settings.rabbitmq_url)

email_client = EmailClient(
    mail_user=settings.mail_user, mail_password=settings.mail_password
)


db = Database(settings)


@celery.task
def send_recovery_code(email: str, first_name: str, last_name: str, code: str) -> None:
    """Sends email with password recovery link"""
    subject = "Смена пароля"
    template = "password_recover.jinja"
    link_on_password_recover = f"{settings.domain}/reset-password?token={code}"

    data = {
        "fullname": f"{first_name} {last_name}",
        "link_on_password_recover": link_on_password_recover,
    }
    email_client.send_mailing(email, subject, template, data)


@celery.task
def send_emai_on_blood_request(
    email: str, first_name: str, last_name: str, pet_name: str, link_to_details: str
) -> None:
    """Sends email with blood request"""
    subject = "Мы ищем донора для вашего питомца!"
    template = "request.jinja"
    link_on_blood_request = f"{link_to_details}"

    data = {
        "fullname": f"{first_name} {last_name}",
        "pet_name": f"{pet_name}",
        "link_to_details": link_on_blood_request,
    }
    email_client.send_mailing(email, subject, template, data)
