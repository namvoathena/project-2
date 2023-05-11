from mongo.service import MongoService
from bson.objectid import ObjectId


class UserService:
    def __init__(self):
        self.client = MongoService()
        self.collection = self.client.get_collection("users")

    def get(self, params):
        filter_options = {"_id": ObjectId(params["user_id"])}
        projection_options = {"password": False}
        user = self.collection.find_one(filter_options, projection_options)
        if not user:
            raise Exception("User not found!")
        user["_id"] = str(user["_id"])
        user["id"] = user["_id"]
        return user
