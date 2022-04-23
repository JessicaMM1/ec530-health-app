import certifi
from pymongo import MongoClient
import pymongo

def get_database():

    CONNECTION_STRING = "mongodb+srv://ec530user:ec530pw@cluster0.o2gut.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    # Create a connection using MongoClient. You can import MongoClient or use pymongo.MongoClient
    client = pymongo.MongoClient(CONNECTION_STRING, tlsCAFile=certifi.where())

    #db = client.test
    # Create the database for our example (we will use the same database throughout the tutorial
    db = client.test_user
    return client['test_user']

# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":    
    
    # Get the database
    dbname = get_database()
    print(dbname)

    collection_name = dbname["user_1_items"]

    item_1 = {
        "_id" : "U1IT00001",
        "item_name" : "Blender",
        "max_discount" : "10%",
        "batch_number" : "RR450020FRG",
        "price" : 340,
        "category" : "kitchen appliance"
    }

    item_2 = {
        "_id" : "U1IT00002",
        "item_name" : "Egg",
        "category" : "food",
        "quantity" : 12,
        "price" : 36,
        "item_description" : "brown country eggs"
    }

    item_3 = {
        "item_name" : "Bread",
        "quantity" : 2,
        "ingredients" : "all-purpose flour",
        "expiry_date" : "12:21:11"
    }

    #collection_name.insert_many([item_1,item_2])
    collection_name.insert_one(item_3)

    item_details = collection_name.find()
    for item in item_details:
        print(item)

