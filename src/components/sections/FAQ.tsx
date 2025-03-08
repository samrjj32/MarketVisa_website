'use client';
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "How long do I have access to the course?",
    answer: "Once you purchase a course, you get lifetime access to the course content. You can learn at your own pace and revisit the material whenever you need."
  },
  {
    question: "Is there a refund policy?",
    answer: "Yes, we offer a 7-day money-back guarantee. If you're not satisfied with the course, you can request a full refund within 7 days of purchase."
  },
  {
    question: "Do I get a certificate after completing the course?",
    answer: "Yes, upon successful completion of the course, you will receive a certificate of completion that you can share on your professional networks."
  },
  {
    question: "What if I have questions during the course?",
    answer: "You'll have access to our community forum where you can ask questions. For Premium and Enterprise plans, you also get direct access to mentors."
  },
  {
    question: "Are the courses suitable for beginners?",
    answer: "Yes, our courses are designed for all levels. We start with the basics and gradually move to advanced concepts. You can learn at your own pace."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-left">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-600" />
                ) : (
                  <FaChevronDown className="text-gray-600" />
                )}
              </button>
              {openIndex === index && (
                <div className="p-4 bg-white border border-gray-100 rounded-b-lg">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 