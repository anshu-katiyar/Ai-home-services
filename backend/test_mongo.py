from pymongo import MongoClient
import certifi

uri = "mongodb+srv://homeaianshu:Anshuai910427@homeai-cluster.ncwvjv4.mongodb.net/?appName=homeai-cluster"

client = MongoClient(
    uri,
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=10000
)

try:
    client.admin.command("ping")
    print("✅ MongoDB Connected Successfully")
    print(client.list_database_names())
except Exception as e:
    print("❌ Connection Failed")
    print(repr(e))