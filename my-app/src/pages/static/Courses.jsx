import Card from "../../components/Card";
import { FiUser, FiClock, FiUsers } from "react-icons/fi";

const courses = [
  {
    id: 1,
    title: "Introduction to Physics",
    description: "Learn the fundamentals of physics including mechanics, thermodynamics, and waves.",
    duration: "8 weeks",
    level: "Beginner",
    students: 245,
    rating: 4.8,
    instructor: "Dr. Sarah Johnson"
  },
  {
    id: 2,
    title: "Advanced Circuit Analysis",
    description: "Deep dive into electrical circuits, AC/DC analysis, and circuit design principles.",
    duration: "10 weeks",
    level: "Advanced",
    students: 128,
    rating: 4.9,
    instructor: "Prof. Michael Chen"
  },
  {
    id: 3,
    title: "Quantum Mechanics Basics",
    description: "Explore the fascinating world of quantum physics and its applications.",
    duration: "12 weeks",
    level: "Intermediate",
    students: 189,
    rating: 4.7,
    instructor: "Dr. Emily Rodriguez"
  },
  {
    id: 4,
    title: "Optics and Light",
    description: "Understanding light behavior, reflection, refraction, and optical instruments.",
    duration: "6 weeks",
    level: "Beginner",
    students: 312,
    rating: 4.6,
    instructor: "Dr. James Wilson"
  },
  {
    id: 5,
    title: "Thermodynamics",
    description: "Study heat, energy, entropy, and the laws governing thermal systems.",
    duration: "9 weeks",
    level: "Intermediate",
    students: 156,
    rating: 4.8,
    instructor: "Prof. David Lee"
  },
  {
    id: 6,
    title: "Electromagnetic Fields",
    description: "Comprehensive study of electric and magnetic fields and their interactions.",
    duration: "11 weeks",
    level: "Advanced",
    students: 98,
    rating: 4.9,
    instructor: "Dr. Lisa Anderson"
  }
];

export default function Courses() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Available Courses</h1>
          <p className="text-gray-600">Explore our comprehensive collection of physics courses</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} className="hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                  {course.level}
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm text-gray-700 font-medium">{course.rating}</span>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <FiUser />
                  <span>{course.instructor}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <FiClock />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 gap-2">
                  <FiUsers />
                  <span>{course.students} students enrolled</span>
                </div>
              </div>
              
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium">
                Enroll Now
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

