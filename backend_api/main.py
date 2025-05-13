import uuid
import asyncio
from fastapi_users import FastAPIUsers
from .db_dependency import User, get_user_manager, create_db_and_tables, create_async_engine
from .schemas.auth import UserRead, UserCreate, UserUpdate
from .db.auth_backend import auth_backend
from fastapi import FastAPI, Depends
from typing import Optional
from contextlib import asynccontextmanager
from fastapi.staticfiles import StaticFiles
from .routers.content import router as content_router
from .routers.topic import router as topic_router
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield

origins = [
    "http://localhost:3000",
    "http://localhost",
]

fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)

app = FastAPI(
    title="OquEasy", 
    description="Educational platform for learning Olympiad Programming", 
    lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    fastapi_users.get_auth_router(auth_backend),
    prefix="/auth/jwt",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)

@app.get("/authenticated-route")
async def authenticated_route(user: User = Depends(fastapi_users.current_user(active=True))):
    return {"message": f"Hello {user.email}!"}

app.mount("/static", app = StaticFiles(directory="./backend_api/static"), name="static")
app.include_router(content_router)
app.include_router(topic_router)

if __name__ == "__main__":
    uvicorn.run("backend_api.main:app", host="0.0.0.0", log_level="info")