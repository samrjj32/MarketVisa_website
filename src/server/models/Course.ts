import { ObjectId } from 'mongodb';

export interface Course {
  _id?: ObjectId;
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseCreate {
  name: string;
  description: string;
  price: number;
  features: string[];
  isPopular?: boolean;
} 