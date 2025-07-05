import React from 'react';
import { Book, Video, Code } from 'lucide-react';

const LearnElectronics = () => {
  const tutorials = [
    {
      title: "Getting Started with Arduino",
      description: "Learn the basics of Arduino programming and hardware connections.",
      image: "🤖",
      difficulty: "Beginner",
      duration: "45 min",
      type: "hands-on"
    },
    {
      title: "ESP32 IoT Projects",
      description: "Build connected devices with WiFi and Bluetooth capabilities.",
      image: "📡",
      difficulty: "Intermediate",
      duration: "2 hours",
      type: "project"
    },
    {
      title: "PCB Design Fundamentals",
      description: "Design your first printed circuit board from scratch.",
      image: "⚡",
      difficulty: "Advanced",
      duration: "3 hours",
      type: "design"
    },
    {
      title: "Sensor Integration Guide",
      description: "Connect and program various sensors for data collection.",
      image: "📊",
      difficulty: "Intermediate",
      duration: "1.5 hours",
      type: "tutorial"
    },
    {
      title: "Raspberry Pi Setup",
      description: "Complete guide to setting up your Raspberry Pi for projects.",
      image: "🍓",
      difficulty: "Beginner",
      duration: "30 min",
      type: "setup"
    },
    {
      title: "3D Printing for Electronics",
      description: "Design and print custom enclosures for your projects.",
      image: "🖨️",
      difficulty: "Intermediate",
      duration: "2.5 hours",
      type: "design"
    }
  ];

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="learn" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Learn Electronics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master electronics with our interactive tutorials, guides, and hands-on projects. 
            From beginners to advanced makers, we have content for every skill level.
          </p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <Book className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">50+</h3>
            <p className="text-gray-600">Interactive Tutorials</p>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <Video className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">25+</h3>
            <p className="text-gray-600">Video Guides</p>
          </div>
          <div className="bg-white rounded-xl p-8 text-center shadow-lg">
            <Code className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">100+</h3>
            <p className="text-gray-600">Code Examples</p>
          </div>
        </div>

        {/* Tutorial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutorials.map((tutorial, index) => (
            <div
              key={`${tutorial.title}-${index}`}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 text-center">
                <div className="text-6xl mb-4" role="img" aria-label="Tutorial Icon">{tutorial.image}</div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(tutorial.difficulty)}`}>
                  {tutorial.difficulty}
                </span>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tutorial.title}</h3>
                <p className="text-gray-600 mb-4">{tutorial.description}</p>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span>⏱️ {tutorial.duration}</span>
                  <span className="capitalize">📚 {tutorial.type}</span>
                </div>
                
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Start Tutorial
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300">
            View All Tutorials
          </button>
        </div>
      </div>
    </section>
  );
};

export default LearnElectronics;
