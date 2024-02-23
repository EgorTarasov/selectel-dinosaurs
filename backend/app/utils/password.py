from passlib.context import CryptContext  # type: ignore
import hashlib


class PasswordManager:
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    @classmethod
    def verify_password(cls, plain_password: str, hashed_password: str) -> bool:
        return cls.pwd_context.verify(plain_password, hashed_password)

    @classmethod
    def hash_password(cls, password: str) -> str:
        return cls.pwd_context.hash(password)

    @classmethod
    def get_reset_code(cls, email: str) -> str:
        # create url safe reset code

        return hashlib.sha256((email + "reset").encode()).hexdigest()
