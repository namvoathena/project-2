from pymongo import ASCENDING, DESCENDING

SORT_OPTIONS = {
    "default": ("review_count", DESCENDING),
    "popularity": ("review_count", DESCENDING),
    "latest-acs": ("day_ago_created", ASCENDING),
    "top_seller-desc": ("quantity_sold", DESCENDING),
    "price-acs": ("price", ASCENDING),
    "price-desc": ("price", DESCENDING),
}

SORT_OPTIONS_DATA = [
    {"label": "Popularity", "value": "popularity"},
    {"label": "Latest", "value": "latest-acs"},
    {"label": "Best seller", "value": "top_seller-desc"},
    {"label": "Price Low to High", "value": "price-acs"},
    {"label": "Price High to Low", "value": "price-desc"},
]

MIN_PAGE = 1
MIN_PAGE_SIZE = 9

USER_ROLE = {
    "ADMIN": "admin",
    "STANDARD": "standard",
}
