# User Module

from jsonschema import Draft7Validator
import json
import uuid

# from marshmallow import Schema, fields

# # Create marshmallow schemas

# BasicInfoSchema = Schema.from_dict( {
#             "userID": fields.Int(),
#             "first_name": fields.Str(),
#             "last_name": fields.Str()
#         })

# DoctorSchema = Schema.from_dict(
#     {
#     "basicInfo": fields.Nested(BasicInfoSchema),
#     "role": fields.Str(),
#     "attributes": {
#         "patients": ["343", "123"]
#     }
#     }
# )

# PatientSchema = Schema.from_dict(
#     {
#     "basicInfo": {
#             "userID": fields.Int(),
#             "first_name": fields.Str(),
#             "last_name": fields.Str()
#         },
#     "role": fields.Str(),
#     "attributes": {
#             "DOB": fields.Str(),
#             "assigned_doctor": fields.Str()}
#     }
# )




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
        print("Adding patient ",patient.userID, " to list\n")
        self.patients.append(patient)

        print("Updated patient list: ")
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
       

def json_validation(input_json):
    '''
        I might need to convert input_json to dict with json.load()
    '''
    print("json validation")
    # add json validator here
    with open("users_schema.json", "r") as f:
        schema = json.load(f) # schema is dictionary
    # print(type(schema))
        # print(schema)
    Draft7Validator.check_schema(schema)     # verify schema

        # Draft7Validator.check_schema(json.load(open("users_schema.json")))
    validator = Draft7Validator(schema)
    error_list = list(validator.iter_errors(input_json))
    print(error_list)    # prints list of errors

        # Draft7Validator(schema).validate(test)    # throws exceptions
        
        # return dictionary or None if invalid (would be better to throw exceptions)
    if error_list:
        print("Error list")
        return error_list, 400
    else:
        return input_json, 1
        # return input_json_dict
    
    '''
    Alternate function that creates user with given JSON:
    '''

# class UserFactory:

def create_user(json_input):
    # Adds unique 
    # res_dict can be the validated json or the list of errors
    # adds unique user id

    # print("\n CREATE USER\n")
    # print(args)

    # MARSHMALLOW 
    # if args['role'] == "doctor":
    #     new_user = Doctor(args['f_name'], args['l_name'], args['role'])
    #     schema = DoctorSchema()
    #     # new_doc.patients = attributes['patients']
    #     # print("attributes ", attributes['patients'])
    #     # return new_doc
    # elif args['role'] == "patient":
    #     new_user = Patient(args['f_name'], args['l_name'], args['role'])
    #     schema = PatientSchema()

    # result = schema.dump(new_user)
    # print("\n NEW USER")
    # print(result, "\n")
    # print(new_user.__dict__)

    res_dict, code = json_validation(json_input)

    if code != 400:
        res_dict['_id'] = str(uuid.uuid4())[0:8]
    return res_dict

    # if res_dict is None:
    #     print("res_dict is None")
    #     return
    # else:
    #     # try:
    #     user_role = res_dict['role']
    #     basic_info = res_dict['basicInfo']
    #     attributes = res_dict['attributes']
    # # except KeyError:
    #     #     print("key error")

    #     if user_role == "doctor":
    #         new_doc = Doctor(basic_info['first_name'], basic_info['last_name'], user_role)
    #         new_doc.patients = attributes['patients']
    #         # print("attributes ", attributes['patients'])
    #         return new_doc
    #     elif user_role == "patient":
    #         new_pat = Patient(basic_info['first_name'], basic_info['last_name'], user_role)
            
    #         try:
    #             new_pat.dob = attributes['DOB']
    #             new_pat.my_doctor = attributes['assigned_doctor']
    #             new_pat.medical_info = attributes['medical_info']
    #         except:
    #             print("Error info")
    #         return new_pat

def decideRole(role, dob, assignDoc):
    try:
        if role == 'doctor':
            attributes = {
                # "patients": args['patients']
                "patients": []
            }

        elif role == 'patient': 

            attributes = {
                "DOB": dob,
                "assigned_doctor": assignDoc,
            }

        return attributes
    except:
        return {}
        #return {'message': 'No attributes'}
        #print("No attributes")

def find_user(user):

    return "hello" + str(user)


      
'''
    # Alternate function that creates user with given role:


    def create_user(user_role):
        # This function creates user according to role

        # res_dict = json_validation(json_input)
        # create user based on role & fill in attributes from dict
        # user_role = res_dict['role']

        if user_role == "doctor":
            return Doctor("Juana", "Banana", user_role)
        elif user_role == "patient":
            return Patient("Benito", "Bodoque", user_role)
'''


test_patient = {
        "basicInfo": {
            # "userID": 123,
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

test_doc = {
        "basicInfo": {
            "userID": 123,
            "first_name": "Chucho",
            "last_name": "Perez"
        },
        "role": "doctor",
        "attributes": {
            "patients": ["343", "123"]
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
#             "first_name": "Joe",
#             "last_name": "Smith"
#         },
#         "role": "doctor",
#         "attributes": {
#             "patients": ["343", "123"]
#         }
        
# }



# DRIVER CODE - Testing functions
# user_doc = UserFactory.create_user("doctor")
# print(type(user_doc))
# print(user_doc.__dict__)

# user_patient1 = UserFactory.create_user("patient")
# print(user_patient1.__dict__)
# user_patient2 = UserFactory.create_user("patient")
# print(user_patient2.__dict__)
# user_doc.add_patient(user_patient1)

# print(user_doc.__dict__)
# user_doc.add_patient(user_patient2)

# user_docj = UserFactory.create_user(test_doc)
# print(user_docj.__dict__)

# marshmallow
# args = {'f_name': 'rhett', 'l_name': 'terrier', 'role': 'doctor', 'patient': None, 'DOB': None, 'assigned_doctor': None}
# user_patj = create_user(test_doc, args)
# print(user_patj)

'''
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
'''


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
