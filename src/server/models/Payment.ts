import { ObjectId } from 'mongodb';

export interface Payment {
  _id?: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  amount: number;
  status: 'pending' | 'success' | 'failed';
  orderId: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface PaymentCreate {
  userId: string;
  courseId: string;
  amount: number;
  orderId: string;
} 