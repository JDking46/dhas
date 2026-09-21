from flask import Flask, jsonify, request, g
from flask_cors import CORS

from app.auth import create_access_token, get_password_hash, token_required, verify_password
from app.config import settings
from app.database import Base, db, engine
from app.models import Product, Shop, User

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = settings.DATABASE_URL
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
CORS(app)

with app.app_context():
    Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {"message": "Aurelia Luxe API is running"}


@app.post("/api/auth/register")
def register_user():
    data = request.get_json(silent=True) or {}
    full_name = (data.get("full_name") or "").strip()
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    phone = (data.get("phone") or "").strip()
    role = (data.get("role") or "CUSTOMER").upper()

    if not full_name or not email or not password:
        return jsonify({"error": "full_name, email, and password are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 400

    user = User(
        full_name=full_name,
        email=email,
        password_hash=get_password_hash(password),
        phone=phone,
        role=role,
        is_active=True,
    )
    db.session.add(user)
    db.session.commit()

    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
    }), 201


@app.post("/api/auth/login")
def login_user():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    user = User.query.filter_by(email=email).first()
    if not user or not verify_password(password, user.password_hash):
        return jsonify({"error": "Invalid email or password"}), 401

    token = create_access_token(user.id)
    return jsonify({"access_token": token, "token_type": "bearer"})


@app.get("/api/auth/me")
@token_required
def get_me():
    user = g.user
    return jsonify({
        "id": user.id,
        "full_name": user.full_name,
        "email": user.email,
        "phone": user.phone,
        "role": user.role,
    })


@app.post("/api/shops")
@token_required
def create_shop():
    user = g.user
    if user.role != "SELLER":
        return jsonify({"error": "Only sellers can create shops"}), 403

    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    if not name:
        return jsonify({"error": "Shop name is required"}), 400

    slug = name.lower().replace(" ", "-")
    shop = Shop(
        name=name,
        slug=slug,
        description=data.get("description"),
        category=data.get("category"),
        city=data.get("city"),
        country=data.get("country"),
        owner_id=user.id,
    )
    db.session.add(shop)
    db.session.commit()

    return jsonify({"id": shop.id, "name": shop.name, "slug": shop.slug}), 201


@app.post("/api/products")
@token_required
def create_product():
    user = g.user
    shop = Shop.query.filter_by(owner_id=user.id).first()
    if not shop:
        return jsonify({"error": "Seller shop not found"}), 404

    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    price = data.get("price")
    if not name or price is None:
        return jsonify({"error": "Product name and price are required"}), 400

    product = Product(
        name=name,
        description=data.get("description"),
        price=int(price),
        category=data.get("category"),
        stock=int(data.get("stock") or 0),
        image_url=data.get("image_url"),
        shop_id=shop.id,
    )
    db.session.add(product)
    db.session.commit()

    return jsonify({"id": product.id, "name": product.name, "price": product.price}), 201


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=True)
