import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  minPoolSize: 5,
  retryWrites: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
  // Remove w: 'majority' as it might cause issues
};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

async function connectToDatabase() {
  try {
    console.log('Attempting to connect to MongoDB...');
    const newClient = new MongoClient(uri, options);
    await newClient.connect();
    await newClient.db().command({ ping: 1 }); // Test the connection
    console.log('Successfully connected to MongoDB');
    return newClient;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    globalWithMongo._mongoClientPromise = connectToDatabase();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  clientPromise = connectToDatabase();
}

export default clientPromise; 