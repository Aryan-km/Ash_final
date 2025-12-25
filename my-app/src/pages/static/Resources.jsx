import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import { FiDownload, FiClock, FiFolder, FiCompass } from "react-icons/fi";

const resources = [
  {
    id: 1,
    title: "Physics Formula Sheet",
    type: "PDF",
    category: "Reference",
    downloads: 1245,
    size: "2.3 MB",
    description: "Comprehensive collection of essential physics formulas"
  },
  {
    id: 2,
    title: "Lab Safety Guidelines",
    type: "PDF",
    category: "Safety",
    downloads: 892,
    size: "1.8 MB",
    description: "Important safety protocols for laboratory work"
  },
  {
    id: 3,
    title: "Circuit Simulation Guide",
    type: "Video",
    category: "Tutorial",
    downloads: 567,
    size: "45 min",
    description: "Step-by-step guide to using circuit simulation tools"
  },
  {
    id: 4,
    title: "Physics Problem Sets",
    type: "PDF",
    category: "Practice",
    downloads: 1834,
    size: "5.2 MB",
    description: "Collection of practice problems with solutions"
  },
  {
    id: 5,
    title: "Virtual Lab Manual",
    type: "PDF",
    category: "Manual",
    downloads: 723,
    size: "8.1 MB",
    description: "Complete guide to using virtual lab simulations"
  },
  {
    id: 6,
    title: "Physics Concepts Explained",
    type: "Video",
    category: "Tutorial",
    downloads: 1123,
    size: "2 hours",
    description: "Video series explaining key physics concepts"
  },
  {
    id: 7,
    title: "Experiment Templates",
    type: "PDF",
    category: "Template",
    downloads: 456,
    size: "1.2 MB",
    description: "Ready-to-use templates for lab experiments"
  },
  {
    id: 8,
    title: "Study Tips & Strategies",
    type: "PDF",
    category: "Guide",
    downloads: 934,
    size: "3.4 MB",
    description: "Effective study techniques for physics students"
  }
];

const simulations = [
  {
    id: 101,
    name: "Ohm's Law",
    url: "https://phet.colorado.edu/sims/html/ohms-law/latest/ohms-law_en.html",
    description: "Explore the relationship between voltage, current, and resistance",
    category: "Electricity",
    difficulty: "Beginner",
    duration: "30 min"
  },
  {
    id: 102,
    name: "Pendulum Lab",
    url: "https://phet.colorado.edu/sims/html/pendulum-lab/latest/pendulum-lab_en.html",
    description: "Investigate the physics of pendulums and harmonic motion",
    category: "Mechanics",
    difficulty: "Intermediate",
    duration: "45 min"
  },
  {
    id: 103,
    name: "Wave Interference",
    url: "https://phet.colorado.edu/sims/html/wave-interference/latest/wave-interference_en.html",
    description: "Explore wave interference patterns and superposition",
    category: "Waves",
    difficulty: "Intermediate",
    duration: "40 min"
  },
  {
    id: 104,
    name: "Circuit Construction Kit",
    url: "https://phet.colorado.edu/sims/html/circuit-construction-kit-dc/latest/circuit-construction-kit-dc_en.html",
    description: "Build and test electrical circuits with virtual components",
    category: "Electricity",
    difficulty: "Advanced",
    duration: "60 min"
  }
];

const categories = ["All", "Reference", "Safety", "Tutorial", "Practice", "Manual", "Template", "Guide", "Simulations"];

export default function Resources() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const filteredResources = selectedCategory === "All" 
    ? [...resources, ...simulations]
    : selectedCategory === "Simulations"
    ? simulations
    : resources.filter(r => r.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Resources</h1>
          <p className="text-gray-600">Access study materials, guides, reference documents, and interactive simulations</p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-purple-600 text-white"
                  : "bg-purple-50 text-purple-700 hover:bg-purple-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredResources.map((item) => {
            const isSimulation = item.url;
            return (
              <Card key={item.id} className="hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    isSimulation 
                      ? "bg-purple-600 text-white" 
                      : "bg-purple-100 text-purple-700"
                  }`}>
                    {isSimulation ? "Simulation" : item.type}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {isSimulation ? item.difficulty : item.category}
                  </span>
                </div>
                
                <h2 className="text-lg font-semibold text-gray-900 mb-2">{item.name || item.title}</h2>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  {isSimulation ? (
                    <>
                      <span className="flex items-center gap-1"><FiClock /> {item.duration}</span>
                      <span className="flex items-center gap-1"><FiCompass />{item.category}</span>
                    </>
                  ) : (
                    <>
                      <span className="flex items-center gap-1"><FiDownload /> {item.downloads} downloads</span>
                      <span className="flex items-center gap-1"><FiFolder />{item.size}</span>
                    </>
                  )}
                </div>
                
                {isSimulation ? (
                  <button 
                    onClick={() => navigate(`/student/simulation/${encodeURIComponent(item.name)}`)}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium"
                  >
                    Open Simulation
                  </button>
                ) : (
                  <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 active:bg-purple-800 transition-colors text-sm font-medium">
                    Download
                  </button>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}

