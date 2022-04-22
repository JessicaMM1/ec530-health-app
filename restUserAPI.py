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
        parser.add_argument("f_name", required=True, type=str, location='form')
        parser.add_argument("l_name", required=True, type=str, location='form')
        parser.add_argument('role', required=True, type=str, location='form')
        parser.add_argument('accName', required=True, type=str, location='form')
        parser.add_argument('password', required=True, type=str, location='form')
        args = parser.parse_args()
        userInfo = {
            "basicInfo": {
                "first_name": args['f_name'],
                "last_name": args['l_name']
            },
            "role": args['role'],
            "attributes": {
                "patients": []
            }
            # 'Name': args['name'],
            # 'Type': args['type'],
            # 'Gender': args['gender'],
            # 'AccName': args['accName'],
            # 'Password': args['password']
        }
        response = create_user(userInfo)
        if isinstance(response,list):
        #userinfo = json.dumps(userInfo, indent=4)
        #print(userinfo)
            errors = {"message" : response[i].message for i in range(0, len(response)) }
            errors["code"] = 400
            return errors, 400
        else: 
            return response, 200

#curl -X POST http://127.0.0.1:5000/users?name=rhett&type=doctor&gender=male&accName=rt123&password=123456
# CORRECT: curl -d 'name=rhett' -d 'type=doctrs' -d 'gender=male' -d 'accName=12322v' -d 'password=12121' http://127.0.0.1:5000/users 
# curl -d 'f_name=rhett' -d 'l_name=terrier' -d 'role=doctor' -d 'accName=12322v' -d 'password=12121' http://127.0.0.1:5000/users

api.add_resource(restWeb, '/users')

if __name__ == '__main__':
    app.run(debug=True)
