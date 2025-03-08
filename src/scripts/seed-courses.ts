import { CourseService } from '../server/services/course.service';

const courses = [
  {
    name: "Basic Access",
    description: "Perfect for beginners starting their journey",
    price: 4999,
    features: [
      "Full course access",
      "Basic course materials",
      "Community access",
      "3 months access",
      "Email support"
    ]
  },
  {
    name: "Premium Access",
    description: "Best value for serious learners",
    price: 9999,
    features: [
      "Everything in Basic",
      "Premium course materials",
      "Live Q&A sessions",
      "Lifetime access",
      "Priority support",
      "Certificate of completion"
    ],
    isPopular: true
  },
  {
    name: "Enterprise",
    description: "Custom solutions for teams",
    price: 24999,
    features: [
      "Everything in Premium",
      "Custom learning path",
      "Team progress tracking",
      "Dedicated mentor",
      "Custom workshops",
      "Bulk pricing"
    ]
  }
];

async function seedCourses() {
  try {
    for (const course of courses) {
      await CourseService.createCourse(course);
      console.log(`Created course: ${course.name}`);
    }
    console.log('Course seeding completed');
  } catch (error) {
    console.error('Course seeding failed:', error);
  } finally {
    process.exit();
  }
}

seedCourses(); 