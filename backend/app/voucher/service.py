from mongo.service import MongoService


class VoucherService:
    def __init__(self):
        self.client = MongoService()
        self.collection = self.client.get_collection("vouchers")

    def get_list(self, params):
        return_data = []
        vouchers = self.collection.find({})
        for voucher in vouchers:
            voucher["_id"] = str(voucher["_id"])
            return_data.append(voucher)
        return return_data
