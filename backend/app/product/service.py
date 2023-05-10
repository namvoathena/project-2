from mongo.service import MongoService
from bson.objectid import ObjectId
from utils.constants import SORT_OPTIONS, MIN_PAGE, MIN_PAGE_SIZE
from math import ceil


class ProductService:
    def __init__(self):
        self.client = MongoService()
        self.collection = self.client.get_collection("products")

    def get_all_ids(self):
        return_data = []
        product_ids = self.collection.distinct("_id", {})
        for product_id in product_ids:
            return_data.append(str(product_id))
        return return_data

    def validate_get_params(self, params):
        err_msg = ""
        get_params = {
            "page": None,
            "limit": None,
            "sort": None,
            "search": None,
            "brand_ids": None,
            "seller_ids": None,
            "price_range": None,
            "colors": None,
            "category_id": None,
        }

        if (not params["page"].isdigit()) or (int(params["page"]) < MIN_PAGE):
            err_msg += "Page number option is invalid. "
        else:
            get_params["page"] = int(params["page"])

        if (not params["limit"].isdigit()) or (int(params["limit"]) < MIN_PAGE_SIZE):
            err_msg += "Limit number option is invalid. "
        else:
            get_params["limit"] = int(params["limit"])

        if not SORT_OPTIONS[params["sort"]]:
            err_msg += "Sort option is invalid. "
        else:
            get_params["sort"] = SORT_OPTIONS[params["sort"]]

        if params["search"]:
            get_params["search"] = params["search"]

        if params["brand"]:
            brand_ids = params["brand"].split(",")
            if not brand_ids:
                err_msg += "Brand option is invalid. "
            else:
                get_params["brand_ids"] = brand_ids

        if params["seller"]:
            seller_ids = params["seller"].split(",")
            if not seller_ids:
                err_msg += "Seller option is invalid. "
            else:
                get_params["seller_ids"] = seller_ids

        if params["price"]:
            prices = params["price"].split(",")
            if not prices:
                err_msg += "Price range option is invalid. "
            else:
                get_params["price_range"] = prices

        if params["color"]:
            colors = params["color"].split(",")
            if not colors:
                err_msg += "Color option is invalid. "
            else:
                get_params["colors"] = colors

        if params["category"]:
            get_params["category_id"] = params["category"]

        if err_msg:
            raise ValueError(err_msg)

        return get_params

    def get_filter_options(self, params):
        filter_options = {}
        if (
            params["brand_ids"]
            or params["seller_ids"]
            or params["price_range"]
            or params["colors"]
            or params["category_id"]
            or params["search"]
        ):
            filter_options["$and"] = []
            if params["brand_ids"]:
                brand_option = {"$or": []}
                for brand_id in params["brand_ids"]:
                    brand_option["$or"].append({"brand_id": brand_id})
                filter_options["$and"].append(brand_option)
            if params["seller_ids"]:
                seller_option = {"$or": []}
                for seller_id in params["seller_ids"]:
                    seller_option["$or"].append({"seller_id": seller_id})
                filter_options["$and"].append(seller_option)
            if params["price_range"]:
                price_option = {
                    "price": {
                        "$gte": int(params["price_range"][0]),
                        "$lte": int(params["price_range"][1]),
                    }
                }
                filter_options["$and"].append(price_option)
            if params["colors"]:
                color_option = {"colors": {"$in": params["colors"]}}
                filter_options["$and"].append(color_option)
            if params["category_id"]:
                category_option = {
                    "category_id": params["category_id"],
                }
                filter_options["$and"].append(category_option)
            if params["search"]:
                search_option = {"name": {"$regex": params["search"], "$options": "i"}}
                filter_options["$and"].append(search_option)
        return filter_options

    def get_list(self, params):
        filter_options = self.get_filter_options(params)
        projection_options = {
            "description": False,
            "specifications": False,
        }
        sort_options = params["sort"]
        products = (
            self.collection.find(filter_options, projection_options)
            .sort([sort_options])
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
        for product in products:
            product["_id"] = str(product["_id"])
            fetch_data.append(product)
        return [fetch_data, pagination_data]

    def get(self, params):
        product = self.collection.find_one({"_id": ObjectId(params["product_id"])})
        product["_id"] = str(product["_id"])
        return product

    def update(self, params):
        pass

    def delete(self, params):
        pass
