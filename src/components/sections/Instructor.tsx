import Image from 'next/image';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';

interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export default function Instructor() {
  const socialLinks: SocialLink[] = [
    {
      platform: 'LinkedIn',
      url: 'https://linkedin.com/in/instructor',
      icon: <FaLinkedin className="w-5 h-5" />
    },
    {
      platform: 'Twitter',
      url: 'https://twitter.com/instructor',
      icon: <FaTwitter className="w-5 h-5" />
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/instructor',
      icon: <FaGithub className="w-5 h-5" />
    }
  ];

  const achievements = [
    { number: '10+', label: 'Years Experience' },
    { number: '50K+', label: 'Students Taught' },
    { number: '4.9', label: 'Average Rating' },
    { number: '15+', label: 'Courses Created' }
  ];

  return (
    <section className="py-16 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Meet Your Instructor
              </h2>
              <p className="text-xl text-blue-600 font-semibold">
                John Doe
              </p>
              <p className="text-gray-600">
                Senior Software Engineer & Tech Educator with over a decade of experience in building
                scalable applications and teaching modern web development.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Node.js', 'TypeScript', 'Next.js', 'AWS', 'System Design'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {achievements.map(({ number, label }) => (
                <div key={label} className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{number}</div>
                  <div className="text-sm text-gray-600">{label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {socialLinks.map(({ platform, url, icon }) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  aria-label={platform}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          <div className="relative aspect-square max-w-md mx-auto">
            <Image
              src="/instructor.jpg"
              alt="John Doe - Course Instructor"
              fill
              className="object-cover rounded-2xl shadow-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
} 