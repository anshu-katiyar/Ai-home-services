# from pymongo import MongoClient
# import certifi

# uri = "mongodb+srv://homeaianshu:Anshu910427@homeai-cluster.ncwvjv4.mongodb.net/homeai?retryWrites=true&w=majority&appName=homeai-cluster"

# client = MongoClient(
#     uri,
#     tls=True,
#     tlsCAFile=certifi.where()
# )

# print(client.admin.command("ping"))

from pymongo import MongoClient

uri = "mongodb+srv://homeaianshu:Anshu9104@homeai-cluster.pvdwcpg.mongodb.net/?appName=homeai-cluster"

client = MongoClient(uri)

print(client.admin.command("ping"))