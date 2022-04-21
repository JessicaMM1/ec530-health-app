# from flask import Flask
from flask_restful import Resource, Api, reqparse
from 

# app = Flask(__name__)
# api = Api(app)

class restWeb(Resource):
    def get(self):
        return userInfo("userInfo_1290381.json", "903810847"), 200

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_arguement('name', require=True, type=str)
        parser.add_arguement('type', require=True, type=str)
        parser.add_arguement('gender', require=True, type=str)
        parser.add_arguement('accName', require=True, type=str)
        parser.add_arguement('password', require=True, type=str)
        args = parser.parse_args()
        return{
            'name': args['name'],
            'type': args['type'],
            'gender': args['gender'],
            'accName': args['accName'],
            'password': args['password']
        }, 200



# api.add_resource(restWeb, '/')

# if __name__ == '__main__':
#     app.run(debug=True)
