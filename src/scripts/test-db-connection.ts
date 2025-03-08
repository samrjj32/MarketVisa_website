import { dbService } from '../server/services/db.service';

async function testConnection() {
  try {
    console.log('Testing database connection...');
    const isHealthy = await dbService.healthCheck();
    
    if (isHealthy) {
      console.log('Database connection successful!');
      
      // Try to perform a simple operation
      const collection = await dbService.getCollection('test');
      await collection.findOne({});
      console.log('Successfully performed test query');
    } else {
      console.log('Database health check failed');
    }
  } catch (error) {
    console.error('Connection test failed:', error);
  } finally {
    process.exit();
  }
}

testConnection(); 