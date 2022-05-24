from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from api.routers.base_router import base_router
from api.routers.user_router import user_router
from api.routers.auth_router import auth_router
from api.routers.spotify_router import spotify_router

from api.core.config_fastapi import PlayareaConfig, get_playarea_config
from api.core.tasks import create_start_app_handler, create_stop_app_handler

playarea_config: PlayareaConfig = get_playarea_config()

app: FastAPI = FastAPI(
    title=playarea_config.app_name,
    version=playarea_config.version
)

origins = [
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8001",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_event_handler('startup', create_start_app_handler(app))
app.add_event_handler('shutdown', create_stop_app_handler(app))

app.include_router(base_router)
app.include_router(user_router)
app.include_router(auth_router)
app.include_router(spotify_router)
