import json

from app import redis_store


class RedisService:
    def __init__(self):
        pass

    def get(cache_key):
        return redis_store.get(cache_key)

    def set(cache_key, cache_data, cache_timeout):
        redis_store.set(cache_key, json.dumps(cache_data), cache_timeout)

    def delete(cache_key):
        redis_store.delete(cache_key)
