import { Db, MongoClient } from 'mongodb';
import { getEnvVariable } from '../config/env';

export class DatabaseService {
  private static instance: DatabaseService;
  private db: Db | null = null;
  private client: MongoClient | null = null;
  private connecting: Promise<Db> | null = null;

  private constructor() {}

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async connect(): Promise<Db> {
    // If already connecting, wait for that connection
    if (this.connecting) {
      return this.connecting;
    }

    // If already connected and healthy, return existing connection
    if (this.db && this.client) {
      try {
        await this.client.db().command({ ping: 1 });
        return this.db;
      } catch (error) {
        console.log('MongoDB connection lost, reconnecting...');
        this.db = null;
        this.client = null;
      }
    }

    // Create new connection
    this.connecting = (async () => {
      try {
        console.log('Connecting to MongoDB...');
        const uri = getEnvVariable('MONGODB_URI');
        this.client = new MongoClient(uri);
        await this.client.connect();
        
        // Get database name from environment
        const dbName = getEnvVariable('MONGODB_DB');
        console.log('Using database:', dbName);
        
        this.db = this.client.db(dbName);
        
        // Test the connection
        await this.db.command({ ping: 1 });
        console.log('MongoDB connected successfully');

        // Initialize collections
        await this.initializeCollections();
        
        return this.db;
      } catch (error) {
        console.error('MongoDB connection error:', error);
        this.db = null;
        this.client = null;
        throw new Error('Failed to connect to database');
      } finally {
        this.connecting = null;
      }
    })();

    return this.connecting;
  }

  private async initializeCollections() {
    if (!this.db) throw new Error('Database not connected');

    try {
      console.log('Initializing collections...');
      const collections = await this.db.listCollections().toArray();
      const collectionNames = collections.map(c => c.name);

      // Users collection
      if (!collectionNames.includes('users')) {
        console.log('Creating users collection...');
        await this.db.createCollection('users');
        const users = this.db.collection('users');
        await users.createIndex({ email: 1 }, { unique: true });
        await users.createIndex({ phone: 1 });
      }

      // Courses collection
      if (!collectionNames.includes('courses')) {
        console.log('Creating courses collection...');
        await this.db.createCollection('courses');
        const courses = this.db.collection('courses');
        await courses.createIndex({ name: 1 });
        await courses.createIndex({ isPopular: 1 });
      }

      // Payments collection
      if (!collectionNames.includes('payments')) {
        console.log('Creating payments collection...');
        await this.db.createCollection('payments');
        const payments = this.db.collection('payments');
        await payments.createIndex({ userId: 1 });
        await payments.createIndex({ orderId: 1 }, { unique: true });
        await payments.createIndex({ status: 1 });
      }

      console.log('Collections initialized successfully');
    } catch (error) {
      console.error('Failed to initialize collections:', error);
      throw error;
    }
  }

  async getCollection(name: string) {
    const db = await this.connect();
    return db.collection(name);
  }

  // Add a health check method
  async healthCheck() {
    try {
      const db = await this.connect();
      await db.command({ ping: 1 });
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

export const dbService = DatabaseService.getInstance(); 