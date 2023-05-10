from app import app
import logging

from flask import jsonify

from .service import VoucherService


@app.route("/voucher", methods=["GET"])
def get_voucher_list():
    try:
        params = {}
        voucher_service = VoucherService()
        vourchers = voucher_service.get_list(params)
        return jsonify({"status_code": 200, "data": vourchers}), 200
    except Exception as e:
        logging.exception(e)
        return (
            jsonify(
                {"status_code": 404, "msg": "Get-product-list failed!", "data": []}
            ),
            404,
        )
