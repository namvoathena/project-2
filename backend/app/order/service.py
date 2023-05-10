from mongo.service import MongoService
from bson.objectid import ObjectId
from utils.constants import MIN_PAGE, MIN_PAGE_SIZE
from math import ceil


class OrderService:
    def __init__(self):
        self.client = MongoService()
        self.collection = self.client.get_collection("orders")

    def validate_get_params(self, params):
        err_msg = ""
        get_params = {"page": None, "limit": None, "user_id": None}

        if (not params["page"].isdigit()) or (int(params["page"]) < MIN_PAGE):
            err_msg += "Page number option is invalid. "
        else:
            get_params["page"] = int(params["page"])

        if (not params["limit"].isdigit()) or (int(params["limit"]) < MIN_PAGE_SIZE):
            err_msg += "Limit number option is invalid. "
        else:
            get_params["limit"] = int(params["limit"])

        if params["user"]:
            get_params["user_id"] = params["user_id"]

        if err_msg:
            raise ValueError(err_msg)

        return get_params

    def validate_create_params(self, params):
        err = ""
        order_data = {
            "user_id": params["user_id"] if "user_id" in params else None,
            "name": params["name"] if "name" in params else None,
            "phone": params["phone"] if "phone" in params else None,
            "email": params["email"] if "email" in params else None,
            "total_price": params["total_price"] if "total_price" in params else None,
            "discount": params["discount"] if "discount" in params else None,
            "unit_price": params["unit_price"] if "unit_price" in params else None,
            "payment_method": params["payment_method"]
            if "payment_method" in params
            else None,
            "shipping_address": params["shipping_address"]
            if "shipping_address" in params
            else None,
            "created_at": params["created_at"] if "created_at" in params else None,
            "status": params["status"] if "status" in params else None,
            "items": params["items"] if "items" in params else None,
        }
        for field in order_data:
            if not order_data[field]:
                err += f"{field} field must be provided. "

        # if order_data["items"]:
        #     if not isinstance(order_data["items"], list):
        #         err += "Items must be a list of products. "
        #     else:
        #         item_fields = [
        #             "product_img",
        #             "product_name",
        #             "product_price",
        #             "product_quantity",
        #         ]
        #         for item in order_data["items"]:
        #             if not all(item_field in item for item_field in item_fields):
        #                 err += "Item field must have all fields: (product_img, product_name, product_price, product_quantity)"
        #                 break
        if err:
            raise ValueError(err)
        return order_data

    def get_filter_options(self, params):
        filter_options = {}
        if params["user_id"]:
            filter_options["user_id"] = params["user_id"]
        return filter_options

    def get_list(self, params):
        filter_options = self.get_filter_options(params)
        projection_options = {}
        orders = (
            self.collection.find(filter_options, projection_options)
            .skip((params["page"] - 1) * params["limit"])
            .limit(params["limit"])
        )
        total_data = self.collection.count_documents(filter_options)
        last_page = ceil(total_data / params["limit"])
        fetch_data = []
        pagination_data = {
            "total": total_data,
            "limit": params["limit"],
            "current_page": params["page"],
            "last_page": last_page,
        }
        for order in orders:
            order["_id"] = str(order["_id"])
            fetch_data.append(order)
        return [fetch_data, pagination_data]

    def get(self, params):
        order = self.collection.find_one({"_id": ObjectId(params["order_id"])})
        order["_id"] = str(order["_id"])
        return order

    def create(self, params):
        order_data = params
        self.collection.insert_one(order_data)
        order_data["_id"] = str(order_data["_id"])
        return order_data

    def update(self, params):
        pass
