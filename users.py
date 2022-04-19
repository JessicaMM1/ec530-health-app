# User Module
from jsonschema import Draft7Validator
import json
import uuid


class User:

    def __init__(self, first_name, last_name, role) -> None:
        self.userID = str(uuid.uuid4())[0:8]
        self.first_name = first_name
        self.last_name = last_name
        # self.gender = gender
        self.role = role


class Doctor(User):

    def __init__(self, first_name, last_name, role) -> None:
        print("Creating doctor")
        super().__init__(first_name, last_name, role)
        self.patients = []

    def add_patient(self,patient):
        print("Adding patient ",patient.userID, " to list")
        self.patients.append(patient)

        for i in self.patients:
            print(i.__dict__)

    def remove_patient(self,uuid):
        print("Removing patient from list")
        self.patients.remove(uuid)


class Patient(User):
    def __init__(self, first_name, last_name, role) -> None:
        print("Creating patient")
        super().__init__(first_name, last_name, role)

        self.dob = None
        self.my_doctor = None
        #self.age = None  # Would be better to calculate it
        self.medical_info = None
        self.my_devices = None
       

class UserFactory:

    def json_validation(input_json):
        '''
            I might need to convert input_json to dict with json.load()
        '''
        # add json validator here
        with open("users_schema.json", "r") as f:
            schema = json.load(f)
        print(type(schema))
        # print(schema)
        Draft7Validator.check_schema(schema)     # verify schema

        # Draft7Validator.check_schema(json.load(open("users_schema.json")))
        validator = Draft7Validator(schema)
        error_list = list(validator.iter_errors(input_json))
        print(error_list)    # prints list of errors

        # Draft7Validator(schema).validate(test)    # throws exceptions
        
        # return dictionary or None if invalid (would be better to throw exceptions)
        if error_list:
            return None
        # else:
        #     return input_json_dict


   
    def create_user(user_role):
        # This function creates user according to role
        '''
            Alternate function that creates user with given JSON:
            def create_user(json_input):
                res_dict = json_validation(json_input)

                if res_dict is None:
                    return
                else:
                    user_role = res_dict['role']
                    basic_info = res_dict['basicInfo']
                     if user_role == "doctor":
                        return Doctor(basic_info['first_name'], basic_info['last_name'], user_role)
                    elif user_role == "patient":
                        return Patient("Benito", "Bodoque", user_role)


        
        '''
        # res_dict = json_validation(json_input)
        # create user based on role & fill in attributes from dict
        # user_role = res_dict['role']

        if user_role == "doctor":
            return Doctor("Juana", "Banana", user_role)
        elif user_role == "patient":
            return Patient("Benito", "Bodoque", user_role)


# user_doc = UserFactory.create_user("doctor")
# print(user_doc.__dict__)

# user_patient1 = UserFactory.create_user("patient")
# print(user_patient1.__dict__)
# user_patient2 = UserFactory.create_user("patient")
# print(user_patient2.__dict__)
# user_doc.add_patient(user_patient1)
# user_doc.add_patient(user_patient2)

test = {
        "basicInfo": {
            "userID": 123,
            "first_name": "Juana",
            "last_name": "Banana"
        },
        "role": "patient",
        "attributes": {
            "DOB": "232",
            "assigned_doctor": "juana",
            "medical_info": [
                {
                    "illness": "None",
                    "medication": "vitamin c"
                },
                {
                    "illness": "covid",
                    "medication": "rest"
                }
            ]
        }       
}

# *** VALID patient JSON ***
# {
#     "basicInfo": {
#         "userID": 123,
#         "first_name": "Juana",
#         "last_name": "Banana"
#     },
#     "role": "patient",
#     "attributes": {
#         "DOB": "232",
#         "assigned_doctor": "juana",
#         "medical_info": [
#             {   
#                 "illness": "None",
#                 "medication": "vitamin c"
#             },
#             {
#                 "illness": "covid",
#                 "medication": "rest"
#             }
#         ]
#     }       
# }


# *** VALID doctor JSON***
# {
#         "basicInfo": {
#             "userID": 123,
#             "first_name": "Juana",
#             "last_name": "Banana"
#         },
#         "role": "doctor",
#         "attributes": {
#             "patients": ["343", "123"]
#         }
        
# }



with open("users_schema.json", "r") as f:
    schema = json.load(f)   # schema is dict
    # print(schema)
    # print(type(schema)) 
    
    Draft7Validator.check_schema(schema)
    # Draft6Validator.check_schema(json.load(open("users_schema.json")))

validator = Draft7Validator(schema)
# print(list(validator.iter_errors(test)))

error_list = list(validator.iter_errors(test))

print(error_list)  
# Draft7Validator(schema).validate(test)



# # User
# {
#     "userID": 123,
#     "first_name": "Sample",
#     "last_name": "User",
#     "gender": "Female",
#     "role": "Doctor"
# }

# Doctor
# {
#     "userInfo": {
#       "userID": 123,
#       "first_name": "Sample",
#       "last_name": "User",
#       "gender": "Female",
#       "role": "Doctor"
#     },
#      "patients": ["patient1", "patient2"]
# }

# # Patient
# {
#     "userInfo": {
#         "userID": 123,
#         "first_name": "Sample",
#         "last_name": "User",
#         "gender": "Female",
#         "role": "Patient"
#     },
#     "DOB": "01/01/2000",
#     "doctor": "doctor",
#     "devices": ["thermometer", "oximeter"],
#     "medical_info": [
#         { 
#             "medications": "Vitamin D",
#             "illnesses": "none"
#         }
#     ] 
# }
