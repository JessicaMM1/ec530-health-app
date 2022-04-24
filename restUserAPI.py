#mongodb
import certifi
import pymongo

from flask import Flask
from flask_restful import Resource, Api, reqparse
from users import create_user, decideRole


app = Flask(__name__)
api = Api(app)

CONNECTION_STRING = "mongodb+srv://ec530user:ec530pw@cluster0.o2gut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
db = client.healthapp
dbname = client['healthapp']


class restWeb(Resource):
    def get(self):
        ''' 
        Fetches user profile from the database based on username
        Input: username
        Output: 
            - JSON with user profile, 200 (success)
        '''
        parser = reqparse.RequestParser()
        parser.add_argument("username", required=True, type=str, location='form')
        parser.add_argument("password", required=True, type=str, location='form')
        
        args = parser.parse_args()

        print(args)
        username = args['username']
        password = args['password']

        collection_name = dbname["user_profile"]

        item_details = collection_name.find()
        #for item in item_details:
        # This does not give a very readable output
            #print(item)

        #print(collection_name)
        userinfo = collection_name.find_one({
                "username": username,
                "password": password
        })
        
        if userinfo is None:
            userinfo = {'message': 'User not found'}
            
            #return {'message': 'User Not Found'}
        

        print(userinfo)
        return userinfo, 200

    #  curl -X GET -d 'username=rhetty_terrier' -d  'password=12121' http://127.0.0.1:5000/users   

# curl -d 'username=rhetty_TERRIER' http://127.0.0.1:5000/users

        # return create_user("userInfo_1290381.json", "903810847"), 200

    def post(self):
        '''
        Creates a new user in the database based on the provided information
        '''
        parser = reqparse.RequestParser()
        parser.add_argument("f_name", required=True, type=str, location='form')
        parser.add_argument("l_name", required=True, type=str, location='form')
        parser.add_argument('role', required=True, type=str, location='form')
        parser.add_argument('patients', required=False, type=str, location='form', action='append')
        parser.add_argument('DOB', required=False, type=str, location='form')
        parser.add_argument('assigned_doctor', required=False, type=str, location='form')
        parser.add_argument('username', required=True, type=str, location='form')
        parser.add_argument('password', required=True, type=str, location='form')

        args = parser.parse_args()
        userInfo = {
            "basicInfo": {
                "first_name": args['f_name'],
                "last_name": args['l_name']
            },
            "role": args['role'],
            "username": args['username'],
            "password": args['password']
        }

        #attributes = {}

        attributes = decideRole(args['role'], args['DOB'], args['assigned_doctor'])
        print(attributes)
        
        userInfo['attributes'] = attributes
        print("\nUSER INFO")
        print(userInfo)
            # 'Name': args['name'],
            # 'Type': args['type'],
            # 'Gender': args['gender'],
            # 'AccName': args['accName'],
            # 'Password': args['password']
        
        response = create_user(userInfo)

        if isinstance(response,list):
        #userinfo = json.dumps(userInfo, indent=4)
        #print(userinfo)
            errors = {"message" : response[i].message for i in range(0, len(response)) }
            errors["code"] = 400
            return errors, 400
        else: 
            try:
                # CONNECTION_STRING = "mongodb+srv://ec530user:ec530pw@cluster0.o2gut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
                # client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
                # db = client.healthapp
                # dbname = client['healthapp']
                collection_name = dbname["user_profile"]

                collection_name.insert_one(response)
            except:
                errors = {"message": "mongodb failure"}

            return response, 200

#curl -X POST http://127.0.0.1:5000/users?name=rhett&type=doctor&gender=male&accName=rt123&password=123456
# curl -d 'name=rhett' -d 'type=doctrs' -d 'gender=male' -d 'accName=12322v' -d 'password=12121' http://127.0.0.1:5000/users 
# CORRECT: curl -d 'f_name=rhett' -d 'l_name=terrier' -d 'role=doctor' -d 'DOB=01/01/2000' -d 'assigned_doctor=dr.juana' -d 'password=12121' http://127.0.0.1:5000/users
# CORRECT: curl -d 'f_name=rhett' -d 'l_name=terrier' -d 'role=patient' -d 'DOB=01/01/2000' -d 'assigned_doctor=dr.juana' -d 'username=rhetty_terrier' -d 'password=12121' http://127.0.0.1:5000/users

api.add_resource(restWeb, '/users')

if __name__ == '__main__':
    app.run(debug=True)
