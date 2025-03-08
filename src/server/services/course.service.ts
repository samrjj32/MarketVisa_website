import { ObjectId } from 'mongodb';
import { dbService } from './db.service';
import type { Course, CourseCreate } from '../models/Course';

export class CourseService {
  private static readonly COLLECTION = 'courses';

  static async createCourse(courseData: CourseCreate): Promise<Course> {
    const collection = await dbService.getCollection(this.COLLECTION);
    
    const course: Course = {
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const result = await collection.insertOne(course);
    return { ...course, _id: result.insertedId };
  }

  static async getAllCourses(): Promise<Course[]> {
    const collection = await dbService.getCollection(this.COLLECTION);
    return collection.find<Course>({}).toArray();
  }

  static async getCourseById(id: string): Promise<Course | null> {
    const collection = await dbService.getCollection(this.COLLECTION);
    return collection.findOne<Course>({ _id: new ObjectId(id) });
  }
} 