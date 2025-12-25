import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  FiAperture,
  FiActivity,
  FiZap,
  FiStar,
  FiSmartphone,
  FiCpu,
  FiUsers,
  FiBookOpen,
  FiArrowRight,
  FiMonitor,
  FiShield
} from "react-icons/fi";
import Lottie from "lottie-react";
import heroLottie from "../../assets/admin-lottie.json";

// --- Configuration & Data ---
const features = [
  {
    icon: <FiMonitor className="text-3xl text-purple-600" />,
    title: "Virtual Lab",
    description: "Mix chemicals and physics safely in our 3D simulation sandbox.",
    color: "bg-purple-100"
  },
  {
    icon: <FiActivity className="text-3xl text-purple-600" />,
    title: "Space Missions",
    description: "Explore gravity and orbits with interactive space journeys.",
    color: "bg-fuchsia-100"
  },
  {
    icon: <FiStar className="text-3xl text-purple-600" />,
    title: "Earn Badges",
    description: "Complete experiments to level up and earn science badges.",
    color: "bg-violet-100"
  },
  {
    icon: <FiZap className="text-3xl text-purple-600" />,
    title: "AI Tutor",
    description: "Need help? Our assistant is here 24/7 to guide you.",
    color: "bg-purple-50"
  }
];

const stats = [
  { number: "10K+", label: "Happy Students", icon: <FiUsers className="text-purple-600" /> },
  { number: "50+", label: "Fun Courses", icon: <FiBookOpen className="text-purple-600" /> },
  { number: "200+", label: "Experiments", icon: <FiCpu className="text-purple-600" /> }
];

// --- Sub-Components for visual flair ---

const WaveDivider = ({ flip = false }) => (
  <div className={`w-full overflow-hidden leading-[0] transform ${flip ? 'rotate-180' : ''}`}>
    <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-white"></path>
    </svg>
  </div>
);

const FloatingIcon = ({ icon, delay, top, left, right, bottom }) => (
  <div 
    className="absolute text-purple-100 opacity-30 hidden md:block select-none pointer-events-none filter blur-[1px]"
    style={{ 
      top, left, right, bottom,
      animation: `float 6s ease-in-out ${delay}s infinite`,
      fontSize: "48px"
    }}
  >
    {icon}
  </div>
);

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-purple-50 font-sans selection:bg-purple-300 selection:text-purple-900">
      
      {/* --- CSS Injections for Animations --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 3s ease-in-out infinite; }
        
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.5);
        }
      `}</style>

      {/* --- HERO SECTION --- */}
      <div className="relative bg-gradient-to-br from-purple-600 to-indigo-700 pt-24 pb-0 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <FloatingIcon icon={<FiAperture />} delay={0} top="10%" left="5%" />
        <FloatingIcon icon={<FiActivity />} delay={2} top="20%" right="10%" />
        <FloatingIcon icon={<FiZap />} delay={1} bottom="30%" left="15%" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pb-20">
          
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-400 bg-opacity-30 text-white font-bold text-sm tracking-wide mb-6 border border-purple-300 backdrop-blur-sm animate-pulse">
              <FiStar /> New: Multiplayer Experiments
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 drop-shadow-sm">
              Science is <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Super Fun!
              </span>
            </h1>
            <p className="text-xl text-purple-100 mb-8 leading-relaxed font-medium max-w-2xl mx-auto lg:mx-0">
              Don't just read about physics—play with it! Build rockets, mix potions, and explore the universe from your bedroom.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {!user ? (
                <>
                  <Link to="/register" className="px-8 py-4 bg-white text-purple-700 rounded-full font-bold text-lg shadow-[0_4px_0_rgb(200,200,200)] hover:shadow-[0_2px_0_rgb(200,200,200)] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2">
                    <FiArrowRight /> Start for Free
                  </Link>
                  <Link to="/" style={{color: "white"}} className="px-8 py-4 bg-purple-500 bg-opacity-30 border-2 border-purple-300 text-white rounded-full font-bold text-lg hover:bg-purple-500 hover:bg-opacity-50 transition-all flex items-center justify-center gap-2">
                    <FiShield /> Student Login
                  </Link>
                </>
              ) : (
                <Link to={user.role === "ADMIN" ? "/admin" : user.role === "TEACHER" ? "/teacher" : "/student"} 
                  className="px-8 py-4 bg-yellow-400 text-purple-900 rounded-full font-bold text-lg shadow-[0_4px_0_rgb(180,83,9)] hover:shadow-[0_2px_0_rgb(180,83,9)] hover:translate-y-[2px] transition-all flex items-center justify-center gap-2">
                  <FiArrowRight /> Go to My Lab
                </Link>
              )}
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-purple-500 rounded-full opacity-30 filter blur-3xl animate-pulse"></div>
            
            <img 
              src="https://img.freepik.com/free-vector/science-education-background-with-gradient-style_23-2147879555.jpg?w=740&t=st=1703620000~exp=1703620600~hmac=abc" 
              alt="Kid doing Science" 
              className="relative z-10 w-full rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-white/20"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 90% 100%, 0 100%, 0 10%)" }} 
            />
            {/* Floating Badge */}
            <div className="absolute -bottom-10 -left-10 bg-white p-4 rounded-xl shadow-xl animate-bounce z-20 max-w-xs hidden xl:block">
              <div className="flex items-center gap-3">
                <FiStar className="text-purple-600 text-2xl" />
                <div>
                  <p className="font-bold text-purple-900">Top Rated</p>
                  <p className="text-sm text-purple-600">By 10,000+ learners</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <WaveDivider />
      </div>

      {/* --- STATS SECTION (Floating on top of Wave) --- */}
      <div className="relative -mt-20 z-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 shadow-xl text-center transform hover:-translate-y-2 transition-transform duration-300 border-b-4 border-purple-200">
              <div className="flex justify-center mb-2 text-purple-600 text-2xl">{stat.icon}</div>
              <p className="text-4xl md:text-5xl font-black text-purple-600 mb-1">{stat.number}</p>
              <p className="text-gray-600 font-bold uppercase tracking-wider text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-purple-900 mb-4">
              Explore the <span className="underline decoration-wavy decoration-yellow-400">Virtual Lab</span>
            </h2>
            <p className="text-lg text-purple-700 max-w-2xl mx-auto">
              Everything you need to become a junior scientist is right here.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className={`group relative p-8 rounded-3xl transition-all duration-300 hover:scale-105 border-2 border-transparent hover:border-purple-200 ${feature.color}`}>
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-4xl group-hover:rotate-12 transition-transform">
                  {feature.icon}
                </div>
                <div className="mt-8 text-center">
                  <h3 className="text-xl font-bold text-purple-900 mb-3">{feature.title}</h3>
                  <p className="text-purple-800/70 text-sm leading-relaxed font-medium">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- VISUAL BREAK SECTION --- */}
      <div className="py-20 bg-purple-900 relative overflow-hidden">
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600 opacity-20 rounded-full translate-x-1/3 translate-y-1/3"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          <div className="order-2 md:order-1 relative">
             <img 
               src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
               alt="Science Equipment" 
               className="rounded-3xl shadow-2xl rotate-3 border-8 border-white/10"
             />
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-purple-900 shadow-lg animate-wiggle">
               Ready
            </div>
          </div>
          <div className="order-1 md:order-2 text-white">
            <h2 className="text-4xl font-bold mb-6">Learn at your own speed</h2>
            <p className="text-purple-200 text-lg mb-8">
              Whether you are fast like a photon or slow like a tectonic plate, our lessons adapt to you. Watch videos, play games, and test your knowledge.
            </p>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <FiSmartphone className="text-2xl" />
                  <span className="font-semibold">Works on Tablet & Mobile</span>
               </div>
               <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                  <FiCpu className="text-2xl" />
                  <span className="font-semibold">Game-like progression</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="bg-white">
      <WaveDivider flip={true} /> {/* Top wave */}
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="bg-white rounded-[3rem] p-12 shadow-[0_20px_50px_rgba(124,58,237,0.15)] relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600"></div>
             
            <h2 className="text-4xl md:text-5xl font-black text-purple-900 mb-6">Ready for takeoff?</h2>
             <p className="text-lg text-purple-600 mb-10 max-w-lg mx-auto">
               Join thousands of other students and start your first virtual experiment today!
             </p>
             
             <div style={{color: "white"}} className="flex flex-col sm:flex-row gap-4 justify-center">
              {!user ? (
                 <Link to="/register" style={{color: "white"}} className="inline-block px-10 py-5 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
                   Create Free Account
                 </Link>
               ) : (
                 <Link to="/student" className="inline-block px-10 py-5 bg-purple-600 text-white rounded-full font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all">
                   Resume Learning
                 </Link>
               )}
             </div>
             
             <p className="mt-6 text-sm text-gray-400 font-medium">No credit card required • Safe for kids</p>
          </div>
        </div>
      </div>

    </div>
  );
}