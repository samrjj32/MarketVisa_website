import { NextResponse } from 'next/server';
import { dbService } from '@/server/services/db.service';

export async function GET() {
  try {
    // Test database connection
    const isHealthy = await dbService.healthCheck();
    
    if (!isHealthy) {
      throw new Error('Database health check failed');
    }

    // Try to perform a simple operation
    const collection = await dbService.getCollection('test');
    await collection.findOne({});

    return NextResponse.json({
      status: 'success',
      message: 'Database connection successful'
    });

  } catch (error) {
    console.error('Database test error:', error);
    return NextResponse.json(
      { 
        error: 'Database connection failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 