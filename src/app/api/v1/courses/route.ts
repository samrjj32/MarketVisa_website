import { NextResponse } from 'next/server';
import { CourseService } from '@/server/services/course.service';

export async function GET() {
  try {
    const courses = await CourseService.getAllCourses();
    return NextResponse.json(courses);
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch courses' },
      { status: 500 }
    );
  }
} 