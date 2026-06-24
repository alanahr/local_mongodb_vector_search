db.knowledge_base.createSearchIndex(
  "vector_index",
  {
    "definition": {
      "mappings": {
        "dynamic": false,
        "fields": {
          "embedding": {
            "type": "vector",
            "path": "description_embedding",
            "dimensions": 384,           // Match your embedding model
            "similarity": "cosine"        // Can be "cosine", "euclidean", or "dotProduct"
          }
        }
      }
    }
  }
)