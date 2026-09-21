from datetime import datetime, timedelta
from functools import wraps

import jwt
from flask import g, jsonify, request

from app.config import settings
from app.models import User


def verify_password(plain_password: str, hashed_password: str) -> bool:
    from flask_bcrypt import Bcrypt
    bcrypt = Bcrypt()
    return bcrypt.check_password_hash(hashed_password, plain_password)


def get_password_hash(password: str) -> str:
    from flask_bcrypt import Bcrypt
    bcrypt = Bcrypt()
    return bcrypt.generate_password_hash(password).decode("utf-8")


def create_access_token(user_id: int) -> str:
    payload = {
        "sub": str(user_id),
        "exp": datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)


def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")
        if not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid token"}), 401

        token = auth_header.split(" ", 1)[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
            user_id = payload.get("sub")
            if not user_id:
                return jsonify({"error": "Invalid token"}), 401
            user = User.query.filter_by(id=int(user_id)).first()
            if not user:
                return jsonify({"error": "User not found"}), 401
            g.user = user
        except Exception:
            return jsonify({"error": "Token expired or invalid"}), 401

        return f(*args, **kwargs)

    return decorator
