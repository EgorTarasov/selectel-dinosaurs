from fastapi import APIRouter, Depends, HTTPException, Form
from sqlalchemy.orm import Session
from typing import List, Optional
from ..middlewares.db_session import get_session
from ..middlewares.current_user import get_current_user
from ..schemas import BankDto
from ...models import User

router = APIRouter(prefix="/banks")


@router.get("/", response_model=List[BankDto])
def get_all_blood_donations(
        db: Session = Depends(get_session),
):
    return []