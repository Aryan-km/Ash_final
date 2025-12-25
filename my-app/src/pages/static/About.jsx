import Card from "../../components/Card";

const features = [
  {
    icon: "🔬",
    title: "Interactive Simulations",
    description: "Hands-on virtual experiments to understand complex physics concepts"
  },
  {
    icon: "📚",
    title: "Comprehensive Courses",
    description: "Well-structured courses covering all major physics topics"
  },
  {
    icon: "👨‍🏫",
    title: "Expert Instructors",
    description: "Learn from experienced professors and educators"
  },
  {
    icon: "📊",
    title: "Progress Tracking",
    description: "Monitor your learning journey with detailed analytics"
  },
  {
    icon: "🎯",
    title: "Practice Problems",
    description: "Extensive problem sets to reinforce your understanding"
  },
  {
    icon: "💡",
    title: "24/7 Access",
    description: "Learn at your own pace, anytime and anywhere"
  }
];

const stats = [
  { number: "10,000+", label: "Active Students" },
  { number: "50+", label: "Courses Available" },
  { number: "200+", label: "Simulations" },
  { number: "95%", label: "Satisfaction Rate" }
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Virtual Lab</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive online learning platform designed to make physics education accessible, 
            interactive, and engaging for students of all levels.
          </p>
        </div>

        <div className="mb-12">
          <Card>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Virtual Lab was created with the vision of democratizing physics education. We believe 
              that every student should have access to high-quality learning resources and interactive 
              tools that make complex concepts easier to understand.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Through our platform, students can explore physics concepts through virtual simulations, 
              access comprehensive course materials, and learn from expert instructors—all in a 
              flexible, self-paced environment.
            </p>
          </Card>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx}>
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">Platform Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <Card key={idx} className="text-center">
                <p className="text-3xl font-bold text-purple-600 mb-2">{stat.number}</p>
                <p className="text-gray-600 text-sm">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>

        <Card>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Why Choose Virtual Lab?</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Interactive virtual experiments that bring physics concepts to life</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Comprehensive course library covering all physics topics</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Expert instructors with years of teaching experience</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Flexible learning schedule that fits your lifestyle</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Progress tracking and detailed analytics</span>
            </li>
            <li className="flex items-start">
              <span className="text-purple-600 mr-2">✓</span>
              <span>Accessible from any device, anywhere in the world</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}

