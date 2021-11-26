import pymongo
import ssl

client = pymongo.MongoClient("mongodb+srv://nando2224:nando2224@clustercertus.8ka94.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",ssl_cert_reqs=ssl.CERT_NONE)

print(client.list_database_names())

db = client.tienda

coll = db.productoPrecio

coll.insert_many([
    {'Producto':'Inka Cola 1/2 Litro',
    'Precio':'1.50'}
])

for documento in coll.find({
}):
    print(documento['Producto'])