from sentence_transformers import SentenceTransformer
from pymongo import MongoClient


# Load the model locally from Hugging Face
# https://huggingface.co/sentence-transformers/all-MiniLM-L6-v2
model = SentenceTransformer("all-MiniLM-L6-v2")
# Define sample documents
documents = [
    {"name": "Laptop", "description": "High-performance gaming laptop with 16GB RAM."},
    {"name": "Coffee Maker", "description": "Automatic espresso machine with a milk frother."},
    {"name": "Headphones", "description": "Noise-canceling wireless over-ear headphones."}
]

client = MongoClient("mongodb://localhost:27017/")
db = client["search_demo"]
collection = db["products"]

def generate_embeddings(documents):
    # Generate embeddings and add them to your documents
    for doc in documents:
        # Convert text description into a dense vector (list of floats)
        embedding = model.encode(doc["description"]).tolist()
        doc["description_embedding"] = embedding


def insert_embeddings(documents):
    # Clear old data and insert new documents with embeddings
    collection.delete_many({})
    collection.insert_many(documents)
    print(f"Successfully inserted {len(documents)} documents.")

generate_embeddings(documents)
insert_embeddings(documents)

def do_query():
    # 1. User search query
    query_text = "Something to make hot drinks"

    # 2. Embed the query text using Hugging Face
    query_embedding = model.encode(query_text).tolist()

    # 3. Build MongoDB Vector Search pipeline
    pipeline = [
        {
            "$vectorSearch": {
                "index": "default", # Name of your vector index
                "path": "description_embedding",
                "queryVector": query_embedding,
                "numCandidates": 10, # Pool of closest documents to inspect
                "limit": 1 # Number of final results to return
            }
        },
        {
            "$project": {
                "_id": 0,
                "name": 1,
                "description": 1,
                "score": {"$meta": "vectorSearchScore"} # View match confidence
            }
        }
    ]
    # 4. Execute search
    results = collection.aggregate(pipeline)
    for result in results:
        print(f"Match Found: {result['name']} (Score: {result['score']:.4f})")
        print(f"Description: {result['description']}")