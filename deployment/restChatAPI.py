#mongodb
import certifi
import pymongo

from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from users import create_user, decideRole
import uuid
from datetime import datetime


app = Flask(__name__)
# api = Api(app)

CONNECTION_STRING = "mongodb+srv://ec530user:ec530pw@cluster0.o2gut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
db = client.healthapp
dbname = client['healthapp']


# class restWeb(Resource):
#     def get(self):

# http://127.0.0.1:5000/chatsGet?username=clara
@app.route('/chatsGet', methods=['GET'])
def getChats():
    ''' 
    Returns everything
    Fetches user profile from the database based on username
    Input: username
    Output: 
        - JSON with user profile, 200 (success)
    '''
    print("*** GET ***")
    args = request.args
    username = args.get('username')
    print(f"Username is {username}")
    userChat = {}
    #parser = reqparse.RequestParser()
    #parser.add_argument("username", required=True, type=str, location='form')
    #parser.add_argument("password", required=True, type=str, location='form')
    
    #args = parser.parse_args()

    #print(args)
    #username = args['username']
    #password = args['password']

    collection_name = dbname["user_chat"]

    # Getting all the documents in collection:
    item_details = collection_name.find()
    
    for i, item in enumerate(item_details):
        print(item)
        if item["sender"] != username:
    # This does not give a very readable output
            userChat[i] = item
            
        #print(item)

   
    
    # userChat = collection_name.find_one({
    #         "sender": username,
    # })
    
    # if userChat is None:
    #     userChat = {'message': 'Sender not found'}
    
    # if item_details is None:
    #     item_details = {'message': 'User not found'}
        
        #return {'message': 'User Not Found'}

    # print(userinfo)
    return userChat
        
#         # print(item_details)
#         # return item_details, 200
        
#         # return create_user("userInfo_1290381.json", "903810847"), 200

#         # How to call with curl
#         #  curl -X GET -d 'username=rhetty_terrier' -d  'password=12121' http://127.0.0.1:5000/users   
#         # curl -X GET http://127.0.0.1:5000/users/?username=hello&password=bye
#         # curl -d 'username=rhetty_TERRIER' http://127.0.0.1:5000/users
#         # curl http://127.0.0.1:5000/chatsGet?username='rhett'

# http://127.0.0.1:5000/new-msg?sender=clara&recipient=Dr.Rhett&text=i am sick    
@app.route('/new-msg', methods=['POST'])
def new_msg():
    print("*** POST ***")
    args = request.args
    print(args)
    sender = args.get('sender')
    recipient = args.get('recipient')
    text = args.get('text')

    msgInfo = {
        "sender": str(sender),
        "recipient": str(recipient),
        "text": str(text)
    }

    msgInfo['_id'] = str(uuid.uuid4())[0:8]
    now = datetime.now()
    msgInfo['date'] = now.strftime("%d/%m/%Y %H:%M:%S")

    print("\MSG INFO")
    print(msgInfo)

    try:
        # CONNECTION_STRING = "mongodb+srv://ec530user:ec530pw@cluster0.o2gut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
        # client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
        # db = client.healthapp
        # dbname = client['healthapp']
        collection_name = dbname["user_chat"]

        collection_name.insert_one(msgInfo)
    except:
        errors = {"message": "mongodb failure chat"}

    return msgInfo, 200

    # http://127.0.0.1:5000/chatsGet?sender=jessica&recipient=Dr.Rhett&text='hello'


@app.route('/check-user', methods=['GET'])
def check_user():
    # args = request.args

    print("in check user")
    userinfo = {}
    #parser = reqparse.RequestParser()
    #parser.add_argument("username", required=True, type=str, location='form')
    #parser.add_argument("password", required=True, type=str, location='form')
    
    #args = parser.parse_args()

    #print(args)
    #username = args['username']
    #password = args['password']

    collection_name = dbname["user_profile"]

    # Getting all the documents in collection:
    item_details = collection_name.find()
    for i, item in enumerate(item_details):
    # This does not give a very readable output
        userinfo[i] = item
        #print(item)

   
    
    # userChat = collection_name.find_one({
    #         "sender": username,
    # })
    
    # if userChat is None:
    #     userChat = {'message': 'Sender not found'}
    
    # if item_details is None:
    #     item_details = {'message': 'User not found'}
        
        #return {'message': 'User Not Found'}

    # print(userinfo)
    return userinfo



#     def post(self):
#         '''
#         Creates a new user in the database based on the provided information
#         '''
#         parser = reqparse.RequestParser()
#         parser.add_argument("sender", required=True, type=str, location='form')
#         parser.add_argument("recipient", required=True, type=str, location='form')
#         parser.add_argument('text', required=True, type=str, location='form')
#         # parser.add_argument('date', required=False, type=str, location='form')

#         args = parser.parse_args()
#         msgInfo = {
#             "sender": args['sender'],
#             "recipient": args['recipient'],
#             "text": args['text']
#         }

#         #attributes = {}
#         msgInfo['_id'] = str(uuid.uuid4())[0:8]
#         now = datetime.now()
#         msgInfo['date'] = now.strftime("%d/%m/%Y %H:%M:%S")

#         print("\MSG INFO")
#         print(msgInfo)
#             # 'Name': args['name'],
#             # 'Type': args['type'],
#             # 'Gender': args['gender'],
#             # 'AccName': args['accName'],
#             # 'Password': args['password']
        

#         try:
#             # CONNECTION_STRING = "mongodb+srv://ec530user:ec530pw@cluster0.o2gut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
#             # client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())
#             # db = client.healthapp
#             # dbname = client['healthapp']
#             collection_name = dbname["user_chat"]

#             collection_name.insert_one(msgInfo)
#         except:
#             errors = {"message": "mongodb failure chat"}

#         return msgInfo, 200

# # How to call with curl
# # curl -X POST http://127.0.0.1:5000/users?name=rhett&type=doctor&gender=male&accName=rt123&password=123456
# # curl -d 'name=rhett' -d 'type=doctrs' -d 'gender=male' -d 'accName=12322v' -d 'password=12121' http://127.0.0.1:5000/users 
# # CORRECT: curl -d 'f_name=rhett' -d 'l_name=terrier' -d 'role=doctor' -d 'DOB=01/01/2000' -d 'assigned_doctor=dr.juana' -d 'password=12121' http://127.0.0.1:5000/users
# # CORRECT: curl -d 'sender=jessica' -d 'recipient=rhett' -d 'date=01/01/2022' -d 'text=hello rhett' https://health-app-2022.ue.r.appspot.com/chats
# # curl -d 'sender=jessica' -d 'recipient=rhett' -d 'date=01/01/2022' -d 'text=hello rhett' http://127.0.0.1:5000/chats

# api.add_resource(restWeb, '/chats')

if __name__ == '__main__':
    app.run(debug=True)
