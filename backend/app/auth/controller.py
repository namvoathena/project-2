from app import app
import logging

from flask import request, jsonify


from utils.constants import USER_ROLE

from .service import AuthService


@app.route("/auth/signin", methods=["POST"])
def signin():
    try:
        auth_service = AuthService()
        params = {
            "username": request.json.get("username", None),
            "password": request.json.get("password", None),
        }
        if not params["username"] or not params["password"]:
            raise ValueError("Invalid username or password")
        signed_in_user = auth_service.signin(params)
        return jsonify({"status_code": 200, "data": signed_in_user}), 200
    except Exception as e:
        logging.exception(e)
        return jsonify({"status_code": 401, "msg": "Sign-in failed!"}), 401


@app.route("/auth/signup", methods=["POST"])
def signup():
    try:
        auth_service = AuthService()
        params = {
            "name": request.json.get("name", None),
            "username": request.json.get("username", None),
            "password": request.json.get("password", None),
            "role": USER_ROLE["STANDARD"],
        }
        if not params["username"] or not params["password"]:
            raise ValueError("Invalid username or password")
        signed_up_user = auth_service.signup(params)
        return jsonify({"status_code": 201, "data": signed_up_user}), 201
    except Exception as e:
        logging.exception(e)
        return jsonify({"status_code": 401, "msg": "Sign-up failed!"}), 401


@app.route("/auth/admin/signin", methods=["POST"])
def admin_signin():
    try:
        auth_service = AuthService()
        params = {
            "username": request.json.get("username", None),
            "password": request.json.get("password", None),
        }
        if not params["username"] or not params["password"]:
            raise ValueError("Invalid username or password")
        signed_in_user = auth_service.signin(params)
        return jsonify({"status_code": 200, "data": signed_in_user}), 200
    except Exception as e:
        logging.exception(e)
        return jsonify({"status_code": 401, "msg": "Sign-in failed!"}), 401


@app.route("/auth/admin/signup", methods=["POST"])
def admin_signup():
    try:
        auth_service = AuthService()
        params = {
            "name": request.json.get("name", None),
            "username": request.json.get("username", None),
            "password": request.json.get("password", None),
            "role": USER_ROLE["ADMIN"],
        }
        if not params["username"] or not params["password"]:
            raise ValueError("Invalid username or password")
        signed_up_user = auth_service.signup(params)
        return jsonify({"status_code": 201, "data": signed_up_user}), 201
    except Exception as e:
        logging.exception(e)
        return jsonify({"status_code": 401, "msg": "Sign-up failed!"}), 401
