from app import app
from flask import jsonify


@app.route("/", methods=["GET"])
def index():
    return (
        jsonify(
            {"status_code": 200, "msg": "Welcome to Athena ecommerce application!"}
        ),
        200,
    )
