import Link from 'next/link';
import { FaLinkedin, FaTwitter, FaGithub, FaEnvelope, FaPhone } from 'react-icons/fa';

interface FooterSection {
  title: string;
  links: {
    label: string;
    href: string;
  }[];
}

export default function Footer() {
  const footerSections: FooterSection[] = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "Courses", href: "#courses" },
        { label: "About", href: "#about" },
        { label: "Contact", href: "#contact" },
      ]
    },
    {
      title: "Resources",
      links: [
        { label: "Course Catalog", href: "#catalog" },
        { label: "Student Success", href: "#success" },
        { label: "FAQs", href: "#faq" },
        { label: "Support", href: "#support" },
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Refund Policy", href: "/refund" },
        { label: "Cookie Policy", href: "/cookies" },
      ]
    }
  ];

  const socialLinks = [
    { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaGithub />, href: "https://github.com", label: "GitHub" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="/" className="text-2xl font-bold text-white mb-4 block">
              Course Platform
            </Link>
            <p className="text-gray-400 mb-4">
              Transform your career with our expert-led online courses. Learn at your own pace
              and gain industry-relevant skills.
            </p>
            <div className="flex items-center space-x-4 text-gray-400">
              <a href="mailto:contact@example.com" className="hover:text-white flex items-center gap-2">
                <FaEnvelope /> contact@example.com
              </a>
            </div>
            <div className="mt-2 flex items-center space-x-4 text-gray-400">
              <a href="tel:+1234567890" className="hover:text-white flex items-center gap-2">
                <FaPhone /> +1 (234) 567-890
              </a>
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Course Platform. All rights reserved.
          </p>

          <div className="flex space-x-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
} 