import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MongoDB URI is not defined');
    }

    console.log('Attempting to connect to MongoDB...');
    const client = await MongoClient.connect(uri);
    
    // Test the connection
    await client.db().command({ ping: 1 });
    console.log('Successfully connected to MongoDB');
    
    await client.close();

    return NextResponse.json({ 
      status: 'success',
      message: 'MongoDB connection successful'
    });

  } catch (error) {
    console.error('MongoDB connection error:', error);
    return NextResponse.json({ 
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 