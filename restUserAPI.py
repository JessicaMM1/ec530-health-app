from flask import Flask
from flask_restful import Resource, Api, reqparse
from users import create_user, find_user
import json



app = Flask(__name__)
api = Api(app)

class restWeb(Resource):
    def get(self):
        return find_user("jessica")
        # return create_user("userInfo_1290381.json", "903810847"), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument("name", required=False, type=str, location='form')
        parser.add_argument("type", required=True, type=str, location='form')
        parser.add_argument('gender', required=True, type=str, location='form')
        parser.add_argument('accName', required=True, type=str, location='form')
        parser.add_argument('password', required=True, type=str, location='form')
        args = parser.parse_args()
        userInfo = {
            'Name': args['name'],
            'Type': args['type'],
            'Gender': args['gender'],
            'AccName': args['accName'],
            'Password': args['password']
        }

        #userinfo = json.dumps(userInfo, indent=4)
        #print(userinfo)
        return userInfo

#curl -X POST http://127.0.0.1:5000/users?name=rhett&type=doctor&gender=male&accName=rt123&password=123456
# CORRECT: curl -d 'name=rhett' -d 'type=doctrs' -d 'gender=male' -d 'accName=12322v' -d 'password=12121' http://127.0.0.1:5000/users 
api.add_resource(restWeb, '/users')

if __name__ == '__main__':
    app.run(debug=True)
