
import React from 'react';
import { Search, Filter, Grid } from 'lucide-react';

const ExploreTools = () => {
  const categories = [
    { name: 'Smartphones', count: 45, icon: '📱' },
    { name: 'Laptops', count: 32, icon: '💻' },
    { name: 'Tablets', count: 28, icon: '📱' },
    { name: 'Smartwatches', count: 19, icon: '⌚' },
    { name: 'DIY Kits', count: 67, icon: '🔧' },
    { name: 'Sensors', count: 85, icon: '📡' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Explore Our Tools
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse through our extensive collection of digital electronics, 
            from cutting-edge devices to educational kits and components.
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for devices, components, or kits..."
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors">
                <Filter className="w-4 h-4" />
                Filter
              </button>
              <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-colors">
                <Grid className="w-4 h-4" />
                View
              </button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:shadow-lg hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            >
              <div className="text-4xl mb-3">{category.icon}</div>
              <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreTools;
