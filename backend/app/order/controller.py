from app import app
import logging
from utils.constants import MIN_PAGE, MIN_PAGE_SIZE

from flask import request, jsonify

from flask_jwt_extended import (
    get_jwt_identity,
    jwt_required,
)

from .service import OrderService


@app.route("/order/info/me", methods=["GET"])
@jwt_required()
def get_my_order_list():
    try:
        identity = get_jwt_identity()
        orderService = OrderService()
        params = {
            "page": request.args.get("page", str(MIN_PAGE), type=str),
            "limit": request.args.get("limit", str(MIN_PAGE_SIZE), type=str),
            "user_id": identity["id"],
        }
        get_params = orderService.validate_get_params(params)
        result = orderService.get_list(get_params)
        return (
            jsonify(
                {
                    "status_code": 200,
                    "data": result[0],
                    "pagination": result[1],
                }
            ),
            200,
        )
    except Exception as e:
        logging.exception(e)
        return (
            jsonify(
                {"status_code": 404, "msg": "Get-my-order-list failed!", "data": []}
            ),
            404,
        )


@app.route("/order", methods=["GET"])
def get_order_list():
    try:
        orderService = OrderService()
        params = {
            "page": request.args.get("page", str(MIN_PAGE), type=str),
            "limit": request.args.get("limit", str(MIN_PAGE_SIZE), type=str),
            "user_id": request.args.get("user_id", None, type=str),
        }
        get_params = orderService.validate_get_params(params)
        result = orderService.get_list(get_params)
        return (
            jsonify(
                {
                    "status_code": 200,
                    "data": result[0],
                    "pagination": result[1],
                }
            ),
            200,
        )
    except Exception as e:
        logging.exception(e)
        return (
            jsonify({"status_code": 404, "msg": "Get-order-list failed!", "data": []}),
            404,
        )


@app.route("/order/<string:order_id>", methods=["GET"])
def get_order_detail(order_id):
    try:
        orderService = OrderService()
        params = {"order_id": order_id}
        result = orderService.get(params)
        return jsonify({"status_code": 200, "data": result}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify(
                {"status_code": 404, "msg": "Get-order-detail failed!", "data": []}
            ),
            404,
        )


@app.route("/order", methods=["POST"])
def create_order():
    try:
        orderService = OrderService()
        body_data = request.get_json()
        order_data = orderService.validate_create_params(body_data)
        result = orderService.create(order_data)
        return jsonify({"status_code": 200, "data": result}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify({"status_code": 404, "msg": "Create-order failed!", "data": []}),
            404,
        )


@app.route("/order", methods=["PATCH"])
def update_order():
    try:
        orderService = OrderService()
        order_info = request.get_json()
        result = orderService.update(order_info)
        return jsonify({"status_code": 200, "data": result}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify({"status_code": 404, "msg": "Update-order failed!", "data": []}),
            404,
        )
