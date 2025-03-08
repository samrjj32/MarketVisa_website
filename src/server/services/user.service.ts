import { ObjectId } from 'mongodb';
import { dbService } from './db.service';
import type { User, UserCreate } from '../models/User';

export class UserService {
  private static readonly COLLECTION = 'users';

  static async createUser(userData: UserCreate): Promise<User> {
    const collection = await dbService.getCollection(this.COLLECTION);
    
    const user: User = {
      ...userData,
      status: 'pending',
      createdAt: new Date(),
      courses: [] // Initialize with empty courses array
    };

    const result = await collection.insertOne(user);
    return { ...user, _id: result.insertedId };
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const collection = await dbService.getCollection(this.COLLECTION);
    return collection.findOne<User>({ email });
  }

  static async updateUserStatus(userId: string, status: User['status']): Promise<boolean> {
    const collection = await dbService.getCollection(this.COLLECTION);
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $set: { status } }
    );
    return result.modifiedCount > 0;
  }

  static async addCourseToUser(userId: string, courseId: string): Promise<boolean> {
    const collection = await dbService.getCollection(this.COLLECTION);
    const result = await collection.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { courses: courseId } }
    );
    return result.modifiedCount > 0;
  }
} 