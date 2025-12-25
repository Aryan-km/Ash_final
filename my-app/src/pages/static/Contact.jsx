import Card from "../../components/Card";
import { useState } from "react";
import { FiMail, FiPhone, FiMapPin, FiClock, FiExternalLink } from "react-icons/fi";

const contactInfo = [
  {
    icon: <FiMail className="text-purple-600 text-xl" />,
    title: "Email",
    value: "support@virtuallab.edu",
    description: "Send us an email anytime"
  },
  {
    icon: <FiPhone className="text-purple-600 text-xl" />,
    title: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri 9am-5pm EST"
  },
  {
    icon: <FiMapPin className="text-purple-600 text-xl" />,
    title: "Address",
    value: "123 Education Street",
    description: "Learning City, LC 12345"
  },
  {
    icon: <FiClock className="text-purple-600 text-xl" />,
    title: "Response Time",
    value: "24-48 hours",
    description: "We'll get back to you soon"
  }
];

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your message! We'll get back to you soon.");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
          <p className="text-gray-600">Get in touch with our team - we're here to help!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {contactInfo.map((info, idx) => (
            <Card key={idx}>
              <div className="text-3xl mb-3">{info.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{info.title}</h3>
              <p className="text-gray-900 font-medium mb-1">{info.value}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Your Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
                <textarea
                  rows="5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2.5 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium"
              >
                Send Message
              </button>
            </form>
          </Card>

          <Card>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Office Hours</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Monday - Friday</span>
                <span className="text-gray-600">9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-gray-200">
                <span className="text-gray-700 font-medium">Saturday</span>
                <span className="text-gray-600">10:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-medium">Sunday</span>
                <span className="text-gray-600">Closed</span>
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Need Immediate Help?</h3>
              <p className="text-sm text-gray-600 mb-3">
                For urgent technical issues, please contact your teacher or system administrator directly.
              </p>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                Find Your Teacher →
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

