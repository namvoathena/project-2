from app import app
import logging
from utils.constants import MIN_PAGE, MIN_PAGE_SIZE

from flask import request, jsonify

# from flask_jwt_extended import (
#     get_jwt_identity,
#     jwt_required,
# )

from .service import ProductService


@app.route("/product", methods=["GET"])
def get_product_list():
    try:
        product_service = ProductService()
        params = {
            "page": request.args.get("page", str(MIN_PAGE), type=str),
            "limit": request.args.get("limit", str(MIN_PAGE_SIZE), type=str),
            "sort": request.args.get("sort", "default", type=str),
            "search": request.args.get("search", None, type=str),
            "brand": request.args.get("brand", None, type=str),
            "seller": request.args.get("seller", None, type=str),
            "price": request.args.get("price", None, type=str),
            "color": request.args.get("color", None, type=str),
            "category": request.args.get("category", None, type=str),
        }
        get_params = product_service.validate_get_params(params)
        result = product_service.get_list(get_params)
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
                {
                    "status_code": 404,
                    "msg": f"Get-product-list failed! In detail: {e}",
                    "data": [],
                }
            ),
            404,
        )


@app.route("/product/<string:product_id>", methods=["GET"])
def get_product_detail(product_id):
    try:
        product_service = ProductService()
        params = {"product_id": product_id}
        product = product_service.get(params)
        return jsonify({"status_code": 200, "data": product}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify(
                {"status_code": 404, "msg": "Get-product-detail failed!", "data": []}
            ),
            404,
        )


@app.route("/product/all/ids", methods=["GET"])
def get_all_product_ids():
    try:
        product_service = ProductService()
        product_ids = product_service.get_all_ids()
        return jsonify({"status_code": 200, "data": product_ids}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify(
                {"status_code": 404, "msg": "Get-all-product-ids failed!", "data": []}
            ),
            404,
        )


# @app.route("/product", methods=["POST"])
# @jwt_required()
# def create_product():
#     identity = get_jwt_identity()
#     return "Product create route!"


# @app.route("/product/<int:product_id>", methods=["PATCH"])
# @jwt_required()
# def update_product():
#     identity = get_jwt_identity()
#     return "Product update route!"
