from app import app
import logging

from flask import jsonify

from .service import ProductFilterService


@app.route("/product-filter", methods=["GET"])
def get_product_filter():
    try:
        product_filter_service = ProductFilterService()
        result = product_filter_service.get_list()
        return (
            jsonify({"status_code": 200, "data": result}),
            200,
        )
    except Exception as e:
        logging.exception(e)
        return (
            jsonify(
                {
                    "status_code": 404,
                    "msg": "Get-product-filter-options failed!",
                    "data": [],
                }
            ),
            404,
        )
