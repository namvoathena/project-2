from mongo.service import MongoService
from utils.constants import SORT_OPTIONS_DATA


class ProductFilterService:
    def __init__(self):
        self.client = MongoService()
        self.category_collection = self.client.get_collection("product_categories")
        self.color_collection = self.client.get_collection("product_colors")
        self.seller_collection = self.client.get_collection("product_sellers")
        self.brand_collection = self.client.get_collection("product_brands")

    def get_list(self):
        filter_options = {}
        projection_options = {"_id": False}
        category_options = self.category_collection.find(
            filter_options, projection_options
        )
        color_options = self.color_collection.find(filter_options, projection_options)
        seller_options = self.seller_collection.find(filter_options, projection_options)
        brand_options = self.brand_collection.find(filter_options, projection_options)
        sort_options = SORT_OPTIONS_DATA
        return_data = {
            "category_options": list(category_options),
            "color_options": list(color_options),
            "seller_options": list(seller_options),
            "brand_options": list(brand_options),
            "sort_options": list(sort_options),
        }
        return return_data
