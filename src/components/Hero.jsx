
import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-white to-blue-50 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Explore the
                <span className="block text-blue-600">Digital Future</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                Discover cutting-edge electronics, learn with interactive tutorials, 
                and build tomorrow's innovations with our comprehensive platform for 
                digital enthusiasts.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Shop Devices
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
                Start Learning
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-gray-600">Devices</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50+</div>
                <div className="text-gray-600">Tutorials</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">10K+</div>
                <div className="text-gray-600">Users</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            <div className="relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-blue-100 to-blue-200 rounded-3xl overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 flex items-center justify-center">
                  <div className="text-6xl">📱</div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl">💻</div>
              </div>
              <div className="absolute bottom-8 right-8 w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-2xl">⌚</div>
              </div>
              <div className="absolute top-1/2 right-4 w-12 h-12 bg-blue-600 rounded-lg shadow-lg flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <div className="text-white text-lg">🔧</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
