from flask import Flask
from flask_jwt_extended import JWTManager
from flask_cors import CORS
import os
import sys
from dotenv import load_dotenv

import redis

# Add to system path for components import:
app_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(app_dir)

# Initilize Flask application:
app = Flask(__name__)
CORS(app)
app.config["CORS_HEADERS"] = "Content-Type"

# Setup the Flask-JWT-Extended extension
jwt = JWTManager(app)
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")

# Setup environment variables:
load_dotenv()

from home.controller import *
from product.controller import *
from auth.controller import *
from product_filter.controller import *
from voucher.controller import *
from order.controller import *
