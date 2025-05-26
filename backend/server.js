const { ApolloServer } = require('apollo-server');
const { MongoClient } = require('mongodb');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/blog-app';
const PORT = process.env.PORT || 4000;

let mongoClient;

async function startServer() {
  try {
    // Connect to MongoDB
    mongoClient = new MongoClient(MONGODB_URI);
    await mongoClient.connect();
    const db = mongoClient.db();
    console.log('Connected to MongoDB');

    // Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: () => ({ db })
    });

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`🚀 Server ready at ${url}`);

    // Handle process termination signals
    process.on('SIGINT', async () => {
      console.log('SIGINT signal received: closing MongoDB connection');
      if (mongoClient) {
        await mongoClient.close();
        console.log('MongoDB connection closed');
      }
      process.exit(0);
    });

    process.on('SIGTERM', async () => {
      console.log('SIGTERM signal received: closing MongoDB connection');
      if (mongoClient) {
        await mongoClient.close();
        console.log('MongoDB connection closed');
      }
      process.exit(0);
    });

  } catch (error) {
    console.error('Error starting server:', error);
    // Exit the process if server fails to start
    process.exit(1);
  }
}

startServer(); 