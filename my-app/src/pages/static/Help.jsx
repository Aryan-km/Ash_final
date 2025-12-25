import Card from "../../components/Card";
import { useState } from "react";

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer: "To enroll in a course, simply navigate to the Courses page, browse available courses, and click the 'Enroll Now' button on any course you're interested in. You'll need to be logged in to enroll."
  },
  {
    question: "How do I access simulations?",
    answer: "Once logged in as a student, go to the Simulations page from your dashboard. You can access all available virtual lab simulations there. Click on any simulation to start exploring."
  },
  {
    question: "What should I do if I forgot my password?",
    answer: "If you've forgotten your password, please contact your teacher or administrator. They can help you reset your account credentials."
  },
  {
    question: "How do I track my progress?",
    answer: "Your progress is automatically tracked as you complete simulations and courses. Visit your Student Dashboard to see statistics about your learning journey, including completed simulations and overall progress."
  },
  {
    question: "Can I access courses offline?",
    answer: "Currently, all courses and simulations require an internet connection. However, you can download some resources like PDFs and guides for offline reference."
  },
  {
    question: "How do I get teacher approval?",
    answer: "After registering as a student, your account will be pending approval. Your teacher will review and approve your registration. You'll be notified once your account is approved."
  },
  {
    question: "What browsers are supported?",
    answer: "Virtual Lab works best on modern browsers including Chrome, Firefox, Safari, and Edge. Make sure your browser is updated to the latest version for the best experience."
  },
  {
    question: "How do I contact support?",
    answer: "You can reach out to support through the Contact page or email your teacher directly. For technical issues, contact your system administrator."
  }
];

const guides = [
  {
    title: "Getting Started Guide",
    description: "Learn how to navigate the platform and get started with your first course",
    icon: "🚀"
  },
  {
    title: "Using Simulations",
    description: "Step-by-step guide to using virtual lab simulations effectively",
    icon: "🔬"
  },
  {
    title: "Student Dashboard",
    description: "Understanding your dashboard and tracking your progress",
    icon: "📊"
  },
  {
    title: "Troubleshooting",
    description: "Common issues and how to resolve them",
    icon: "🔧"
  }
];

export default function Help() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help & Support</h1>
          <p className="text-gray-600">Find answers to common questions and learn how to use the platform</p>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Start Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {guides.map((guide, idx) => (
              <Card key={idx} className="hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-3xl mb-3">{guide.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                <p className="text-gray-600 text-sm">{guide.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <Card key={idx}>
                <button
                  className="w-full text-left flex items-center justify-between"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
                  <span className="text-purple-600 text-xl flex-shrink-0">
                    {openIndex === idx ? "−" : "+"}
                  </span>
                </button>
                {openIndex === idx && (
                  <p className="text-gray-600 mt-3 pt-3 border-t border-gray-200">{faq.answer}</p>
                )}
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-600 mb-4">
            If you can't find the answer you're looking for, don't hesitate to reach out to us.
          </p>
          <div className="flex flex-wrap gap-3">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors text-sm font-medium">
              Contact Support
            </button>
            <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors text-sm font-medium">
              View Documentation
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

