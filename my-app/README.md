# Interactive Physics Simulations Platform

A comprehensive educational platform for managing and conducting interactive physics simulations with role-based access control, advanced analytics, and detailed reporting capabilities.

## 📋 Table of Contents

- [Features](#-features)
- [User Roles & Permissions](#-user-roles--permissions)
- [Application Flow](#-application-flow)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Features Overview](#-features-overview)

## ✨ Features

### 🎓 Student Features
- **Interactive Simulations**: Access to static and teacher-created physics simulations
- **Progress Tracking**: Real-time completion status and observation logging
- **Personal Dashboard**: View completed and ongoing simulations
- **Profile Management**: Update personal information and view performance

### 👨‍🏫 Teacher Features
- **Simulation Management**: Create, edit, and delete custom simulations
- **Student Oversight**: Approve/reject student registrations from their school
- **Advanced Analytics**: 4+ different charts showing school performance metrics
- **Detailed Reports**: Comprehensive student reports with PDF download
- **Performance Monitoring**: Track student progress and completion rates

### 🛡️ Admin Features
- **System-wide Oversight**: Manage all schools and users across the platform
- **Teacher Creation**: Create and assign teachers to schools
- **Pending Approvals**: Review and approve student registrations from all schools
- **School Analytics**: View system-wide statistics and school performance

## 👥 User Roles & Permissions

### Student
- Register and create profile
- Access approved simulations
- Log observations during simulations
- View personal progress
- Update profile information

### Teacher
- All student permissions
- Create and manage simulations for their school
- Approve/reject student registrations
- View detailed analytics and reports
- Generate student performance reports

### Admin
- System-wide access to all data
- Create and manage teachers
- Approve/reject students from any school
- View global analytics and statistics

## 🔄 Application Flow

### 1. Registration & Approval Process
```
Student Registration → Teacher/Admin Review → Approval → Access Granted
```

### 2. Simulation Workflow
```
Teacher Creates Simulation → Student Access → Interactive Learning → Observation Logging → Completion Tracking
```

### 3. Reporting & Analytics
```
Data Collection → Analytics Processing → Dashboard Visualization → Report Generation → PDF Export
```

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lottie React** - Animations and illustrations

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

### Charts & Visualization
- **Custom Charts Component** - Line charts, bar charts, pie charts
- **Responsive Design** - Mobile-first approach

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup
```bash
cd server
npm install
# Create .env file with required environment variables
npm run dev
```

### Frontend Setup
```bash
cd my-app
npm install
npm run dev
```

### Environment Variables
Create `.env` file in server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/physics-simulations
JWT_SECRET=your-secret-key
```

## 📡 API Documentation

### Authentication Endpoints
- `POST /auth/login` - User login
- `POST /auth/register` - Student registration

### Student Endpoints
- `GET /student/simulations/available` - Get all available simulations
- `POST /student/simulation/start` - Start a simulation
- `GET /student/simulation/:name` - Get simulation details
- `POST /student/simulation/observation` - Add observation
- `POST /student/simulation/mark-done` - Mark simulation complete

### Teacher Endpoints
- `GET /teacher/simulations` - Get school simulations
- `POST /teacher/simulations` - Create new simulation
- `PUT /teacher/simulation/:id` - Update simulation
- `DELETE /teacher/simulation/:id` - Delete simulation
- `GET /teacher/students/pending` - Get pending approvals
- `PUT /teacher/student/:id/approve` - Approve student
- `GET /teacher/stats` - Get school statistics
- `GET /teacher/reports` - Get detailed student reports

### Admin Endpoints
- `POST /admin/teacher` - Create teacher
- `GET /admin/schools` - Get all schools
- `GET /admin/school/:name` - Get school details
- `GET /admin/pending-students` - Get all pending students
- `PUT /admin/student/:id/approval` - Approve/reject student

## 🗄 Database Schema

### User Models
```javascript
// Student
{
  name: String,
  email: String,
  password: String,
  school: String,
  phone: String,
  address: {
    line1: String,
    city: String,
    state: String,
    zip: String
  },
  bio: String,
  avatarUrl: String,
  approved: Boolean,
  approvedBy: ObjectId, // Reference to Teacher
  role: String // "STUDENT"
}

// Teacher
{
  name: String,
  email: String,
  password: String,
  school: String,
  phone: String,
  address: Object,
  bio: String,
  avatarUrl: String,
  role: String // "TEACHER"
}

// Admin
{
  name: String,
  email: String,
  password: String,
  role: String // "ADMIN"
}
```

### Simulation Models
```javascript
// Teacher-created Simulation
{
  name: String,
  description: String,
  url: String,
  category: String,
  difficulty: String, // "Beginner", "Intermediate", "Advanced"
  duration: String,
  school: String,
  createdBy: ObjectId, // Reference to Teacher
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}

// Simulation Log (Student Progress)
{
  student: ObjectId, // Reference to Student
  simulationName: String,
  started: Date,
  ended: Date,
  isCompleted: Boolean,
  observations: [{
    text: String,
    timestamp: Date,
    student: ObjectId
  }],
  createdAt: Date,
  updatedAt: Date
}
```

## 🎯 Features Overview

### Student Dashboard
- **Quick Stats**: Total simulations, completed simulations, ongoing activities
- **Recent Activity**: Latest simulation attempts
- **Progress Overview**: Visual progress indicators

### Teacher Dashboard
- **School Statistics**: Student count, simulation metrics, approval status
- **Analytics Charts**:
  - Line Chart: Simulation completions over time
  - Pie Chart: Category distribution
  - Bar Chart: Student performance ranking
  - Weekly Activity: Daily engagement metrics
- **Quick Actions**: Direct links to simulations, reports, settings
- **Pending Approvals**: Student registration management

### Simulation Management
- **Static Simulations**: Pre-built physics simulations (Ohm's Law, Pendulum, etc.)
- **Custom Simulations**: Teacher-created simulations with embed URLs
- **Categorization**: Electricity, Mechanics, Waves, Thermodynamics
- **Difficulty Levels**: Beginner, Intermediate, Advanced
- **Progress Tracking**: Real-time completion status

### Reporting System
- **Individual Reports**: Detailed student performance
- **PDF Export**: Comprehensive downloadable reports
- **Performance Metrics**: Completion rates, time spent, observation logs
- **School Analytics**: Teacher overview of all students

### Admin Control Panel
- **Global Oversight**: All schools and users
- **Teacher Management**: Create and assign teachers
- **Student Approvals**: Cross-school registration management
- **System Analytics**: Platform-wide statistics

## 🔐 Security & Authentication

- **JWT Tokens**: Secure authentication with expiration
- **Role-based Access**: Protected routes based on user roles
- **Password Hashing**: bcrypt encryption for passwords
- **Middleware Protection**: Auth and role verification

## 📱 Responsive Design

- **Mobile-First**: Optimized for all screen sizes
- **GitHub-Inspired UI**: Clean, professional interface
- **Consistent Styling**: Unified design language
- **Accessibility**: Proper contrast and navigation

## 🔄 Data Flow

### Student Journey
1. Register → Wait for approval
2. Login → Access dashboard
3. Browse simulations → Start simulation
4. Interact → Log observations
5. Complete → View progress

### Teacher Journey
1. Login → View dashboard
2. Review pending students → Approve/reject
3. Create simulations → Manage content
4. Monitor analytics → Generate reports
5. Download student reports → Review performance

### Admin Journey
1. Login → System overview
2. Create teachers → Assign to schools
3. Review pending students → Approve across schools
4. Monitor system health → View analytics

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Setup
- Set production environment variables
- Configure MongoDB connection
- Set up reverse proxy (nginx recommended)
- Configure SSL certificates

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For support, email support@example.com or create an issue in the repository.

---

**Built with ❤️ for educational excellence**
