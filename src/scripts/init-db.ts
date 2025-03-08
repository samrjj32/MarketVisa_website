import { dbService } from '../server/services/db.service';

async function initializeDatabase() {
  try {
    console.log('Starting database initialization...');
    
    // Get database connection
    const db = await dbService.connect();
    
    // Create collections if they don't exist
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map(c => c.name);

    // Users collection
    if (!collectionNames.includes('users')) {
      console.log('Creating users collection...');
      await db.createCollection('users');
      const usersCollection = db.collection('users');
      await usersCollection.createIndex({ email: 1 }, { unique: true });
      await usersCollection.createIndex({ phone: 1 });
      console.log('Users collection created with indexes');
    }

    // Courses collection
    if (!collectionNames.includes('courses')) {
      console.log('Creating courses collection...');
      await db.createCollection('courses');
      const coursesCollection = db.collection('courses');
      await coursesCollection.createIndex({ name: 1 });
      await coursesCollection.createIndex({ isPopular: 1 });
      console.log('Courses collection created with indexes');
    }

    // Payments collection
    if (!collectionNames.includes('payments')) {
      console.log('Creating payments collection...');
      await db.createCollection('payments');
      const paymentsCollection = db.collection('payments');
      await paymentsCollection.createIndex({ userId: 1 });
      await paymentsCollection.createIndex({ orderId: 1 }, { unique: true });
      await paymentsCollection.createIndex({ status: 1 });
      console.log('Payments collection created with indexes');
    }

    console.log('Database initialization completed successfully');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

// Run initialization
initializeDatabase()
  .then(() => {
    console.log('Database setup complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  }); 