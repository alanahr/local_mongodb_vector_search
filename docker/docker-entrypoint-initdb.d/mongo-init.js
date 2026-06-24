// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time


db.createUser(
   {
      user: mongot_user,
      pwd: mongot_password,
      roles: [ "searchCoordinator"]
   }
)

db = db.getSiblingDB('mongolocalrag');

// Create collections
db.createCollection('entities');
db.createCollection('positions');

// Insert sample entities
db.entities.insertMany([
  { 
    _id: ObjectId(),
    id: 1, 
    name: "agile", 
    entity_type: "skill", 
    color: "#40dae2", 
    icon: "bi bi-backpack", 
    entity_parent: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    _id: ObjectId(),
    id: 2, 
    name: "QA", 
    entity_type: "skill", 
    color: "", 
    icon: "", 
    entity_parent: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    _id: ObjectId(),
    id: 3, 
    name: "SDET", 
    entity_type: "skill", 
    color: "", 
    icon: "", 
    entity_parent: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    _id: ObjectId(),
    id: 4, 
    name: "TestRail", 
    entity_type: "tool", 
    color: "", 
    icon: "", 
    entity_parent: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    _id: ObjectId(),
    id: 5, 
    name: "ArcGIS", 
    entity_type: "tool", 
    color: "", 
    icon: "", 
    entity_parent: null,
    created_at: new Date(),
    updated_at: new Date()
  },
  { 
    _id: ObjectId(),
    id: 6, 
    name: "GIS", 
    entity_type: "skill", 
    color: "", 
    icon: "", 
    entity_parent: null,
    created_at: new Date(),
    updated_at: new Date()
  }
]);

// Insert sample position
db.positions.insertOne({
  _id: ObjectId(),
  id: 1,
  name: 'Software Engineer',
  start_year: 2010,
  start_month: 1,
  start_day: 1,
  end_year: 2015,
  end_month: 3,
  end_day: 1,
  salary: 123456,
  details: [
    {
      id: 1,
      name: 'Participated in Agile Core engineering team in an Agile environment, participated in daily standup and planning, addressed bugs and stories, collaborated with others to solve problems, and advised junior colleagues',
      description: {
        type: 'doc',
        content: [
          {
            type: 'paragraph',
            content: [
              {
                type: 'text',
                text: 'This is still the text editor you\'re used to, but enriched with node views.',
              },
            ],
          },
        ],
      },
      tags: [],
      details: [
        {
          id: 2,
          name: "main job thing I'm talking about here like TestRail",
          tags: [],
          description: {},
          details: [],
        },
        {
          id: 3,
          name: 'Presentations and arcgis',
          tags: [],
          description: {
            type: 'doc',
            content: [
              {
                type: 'heading',
                attrs: { level: 1 },
                content: [{ type: 'text', text: 'Lorem Ipsum' }],
              },
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: 'Justo laoreet sit amet cursus sit. In massa tempor nec feugiat nisl pretium fusce.',
                  },
                ],
              },
            ],
          },
          details: [],
        },
      ],
    },
  ],
  created_at: new Date(),
  updated_at: new Date()
});

// Create indexes for better performance
db.entities.createIndex({ "id": 1 }, { unique: true });
db.entities.createIndex({ "name": 1 });
db.entities.createIndex({ "entity_type": 1 });


// db.knowledge_base.createSearchIndex(
//   "vector_index",
//   {
//     "definition": {
//       "mappings": {
//         "dynamic": false,
//         "fields": {
//           "embedding": {
//             "type": "vector",
//             "dimensions": 1536,           // Match your embedding model (e.g., text-embedding-3-small)
//             "similarity": "cosine"        // Can be "cosine", "euclidean", or "dotProduct"
//           }
//         }
//       }
//     }
//   }
// )

// // 1. Create the Vector Search Index
// db.knowledge_base.createSearchIndex(
//   "vector_index",
//   {
//     "definition": {
//       "mappings": {
//         "dynamic": false,
//         "fields": {
//           "embedding": {
//             "type": "vector",
//             "dimensions": 384,          // 384 matches all-MiniLM-L6-v2 size
//             "similarity": "cosine"
//           }
//         }
//       }
//     }
//   }
// )

// // 2. Create the Full-Text (Keyword) Search Index
// db.knowledge_base.createSearchIndex(
//   "keyword_index",
//   {
//     "definition": {
//       "mappings": {
//         "dynamic": true                 // Dynamically indexes string fields for text searching
//       }
//     }
//   }
// )
print('Database initialization completed successfully!');