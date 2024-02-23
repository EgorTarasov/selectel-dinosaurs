import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .db import Database

from .settings import Settings


from .api.router import create_api_router


@asynccontextmanager
async def lifespan(app: FastAPI):

    yield None
    # close ml models


def create_app() -> FastAPI:
    settings = Settings()  # type: ignore
    db = Database(settings)

    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s %(message)s",
        filemode="w",
    )

    app = FastAPI(
        title="Dinosours Misis API",
        version="0.0.1",
        description="Rest api for frontend Application",
        # docs_url=None,
        # openapi_url=None,
        lifespan=lifespan,
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_credentials=True,
        allow_headers=["*"],
    )
    # router = APIRouter(dependencies=[Depends(get_user_by_token)])
    api_router = create_api_router(db, prefix=settings.api_prefix)

    app.include_router(api_router)
    return app
