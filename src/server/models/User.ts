import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  status: 'pending' | 'active' | 'suspended';
  createdAt: Date;
  courses: string[]; // Array of course IDs the user has access to
}

export interface UserCreate {
  name: string;
  email: string;
  phone: string;
} 