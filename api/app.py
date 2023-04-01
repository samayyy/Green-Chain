from flask import Flask
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin
from flask_restful import Api, Resource

from flask_pymongo import PyMongo

from flask_bcrypt import Bcrypt
from bson.objectid import ObjectId
import os

from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)
CORS(app)

bcrypt = Bcrypt(app)

app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
mongo = PyMongo(app)

# -----------DB Models start--------------------

Users = mongo.db.users

# -----------DB Models end--------------------

# -----------API start--------------------

class AuthRegister(Resource):
    def get(self):
        try:
            user = Users.find_one({'public_address': request.args.get('public_address')})
            if user is None:
                return {'message': 'User not found'}, 404
            else:
                return {
                    username: user['username'],
                    email: user['email'],
                    resolved_complaints: user['resolved_complaints'],
                    role: user['role'],
                }, 200
        except Exception as e:
            return {'message': 'Server Error' + str(e)}, 500

    def post(self):
        try:
            data = request.get_json()
            user = Users.find_one({'public_address': data['public_address']})
            if user is None:
                user = {
                    'username': data['username'],
                    'email': data['email'],
                    'role': data['role'],
                    'type': 'auth',
                    'resolved_complaints': 0,
                }
                Users.insert_one(user)
                return {
                    username: user['username'],
                    email: user['email'],
                    resolved_complaints: user['resolved_complaints'],
                    role: user['role'],
                }, 200
            return {'message': 'User already exists'}, 400
        except Exception as e:
            return {'message': 'Server Error' + str(e)}, 500


# -----------API end--------------------

api = Api(app)
api.add_resource(AuthRegister, '/api/auth/register')


if __name__ == '__main__':
  app.run(debug=True)