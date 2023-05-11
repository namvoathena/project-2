import re
from mongo.service import MongoService
from flask_bcrypt import generate_password_hash, check_password_hash
from flask_jwt_extended import (
    create_access_token,
)


class AuthService:
    def __init__(self):
        self.client = MongoService()
        self.collection = self.client.get_collection("users")

    def signin(self, params):
        comming_user = {
            "username": params["username"],
            "password": params["password"],
        }
        user = self.collection.find_one({"username": comming_user["username"]})
        if not user:
            raise ValueError("Not found user!")
        if not check_password_hash(user["password"], comming_user["password"]):
            raise ValueError("Password is invalid!")
        return self.generate_token(
            {
                "id": str(user["_id"]),
                "username": user["username"],
                "role": user["role"],
                "name": user["name"],
            }
        )

    def signup(self, params):
        new_user = {
            "name": params["name"],
            "username": params["username"],
            "password": params["password"],
            "role": params["role"],
        }
        # NOTE: Validate the email:
        if not re.match(
            r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$", new_user["username"]
        ):
            raise ValueError("Email address is invalid!")

        exist_user = self.collection.find_one({"username": new_user["username"]})
        if exist_user:
            raise ValueError("The user already exists!")

        # TODO: Validate the password:
        # NOTE: Hash password and update the password:
        hashed_password = generate_password_hash(new_user["password"]).decode("utf-8")
        new_user["password"] = hashed_password
        # NOTE: Insert to the database:
        created_user = self.collection.insert_one(new_user)
        return self.generate_token(
            {
                "id": str(created_user.inserted_id),
                "username": new_user["username"],
                "role": new_user["role"],
                "name": new_user["name"],
            }
        )

    def generate_token(self, params):
        user = {
            "id": params["id"],
            "username": params["username"],
            "name": params["name"],
            "role": params["role"],
        }
        identity = {
            "id": user["id"],
            "username": user["username"],
            "role": user["role"],
        }
        access_token = create_access_token(identity, expires_delta=False)
        return {
            "id": user["id"],
            "username": user["username"],
            "name": user["name"],
            "role": user["role"],
            "access_token": access_token,
        }
