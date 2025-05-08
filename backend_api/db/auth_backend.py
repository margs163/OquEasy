from fastapi_users.authentication import JWTStrategy
from fastapi_users.authentication import CookieTransport
from fastapi_users.authentication import AuthenticationBackend 
from dotenv import load_dotenv
from fastapi_users import FastAPIUsers
from ..db_dependency import User, get_user_manager
import uuid
import os
load_dotenv()

SECRET = os.getenv("JWT_SECRET")

def get_jwt_strategy() -> JWTStrategy:
    return JWTStrategy(secret=SECRET, lifetime_seconds=3600)

cookie_transport = CookieTransport(cookie_max_age=86400)

auth_backend = AuthenticationBackend(
    name="jwt",
    transport=cookie_transport,
    get_strategy=get_jwt_strategy,
)


fastapi_users = FastAPIUsers[User, uuid.UUID](
    get_user_manager,
    [auth_backend],
)