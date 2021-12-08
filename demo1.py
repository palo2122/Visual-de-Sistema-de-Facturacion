import pymongo
import ssl

client = pymongo.MongoClient("mongodb+srv://nando2224:nando2224@clustercertus.8ka94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)

print(client.list_database_names())

db = client.users

coll = db.userpasword

coll.insert_many([ 
    {'Usuario':'Fernando',
    'Contraseña':'fernando'}
])

for documento in coll.find({
}):
    print(documento['Usuario'])