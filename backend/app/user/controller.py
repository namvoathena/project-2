from app import app
import logging

from flask import request, jsonify

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from .service import UserService


@app.route("/user/info/me", methods=["GET"])
@jwt_required()
def get_me():
    try:
        identity = get_jwt_identity()
        user_service = UserService()
        params = {
            "user_id": identity["id"],
        }
        user = user_service.get(params)
        return jsonify({"status_code": 200, "data": user}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify({"status_code": 404, "msg": "Get-user-detail failed!", "data": []}),
            404,
        )
