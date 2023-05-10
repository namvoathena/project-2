from pymongo import MongoClient
import certifi
import os


class MongoService:
    def __init__(self):
        self.connect()

    def connect(self):
        self.client = MongoClient(
            os.getenv("MONGODB_URL"),
            tlsCAFile=certifi.where(),
        )
        self.database = self.client[os.getenv("MONGODB_DATABASE")]

    def get_collection(self, name):
        return self.database[name]
