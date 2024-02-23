import logging
from fastapi import status
from fastapi import Depends, HTTPException

from ...auth import oauth2_scheme

# from .auth import oauth2_scheme
# from utils.jwt import JWTEncoder, UserTokenData
from ...utils.jwt import JWTEncoder, UserTokenData


credentials_exception = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Could not validate credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


async def get_current_user(access_token: str = Depends(oauth2_scheme)) -> UserTokenData:
    # TODO: verify token
    try:
        return JWTEncoder.decode_access_token(access_token)
    except Exception as e:
        logging.error(e)
        raise credentials_exception
