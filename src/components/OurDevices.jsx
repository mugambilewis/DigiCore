
import React, { useState } from 'react';
import { Filter, Star, ShoppingCart } from 'lucide-react';

const OurDevices = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Smartphones', 'Laptops', 'Tablets', 'Smartwatches', 'Components'];
  
  const devices = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      category: "Smartphones",
      price: 1199,
      rating: 4.8,
      image: "/images/iphone15promax.png",
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Design"],
      inStock: true
    },
    {
      id: 2,
      name: "MacBook Pro M3",
      category: "Laptops",
      price: 1999,
      rating: 4.9,
      image: "/images/MacBook-Pro-M3.png",
      features: ["M3 Chip", "18-hour Battery", "Liquid Retina XDR"],
      inStock: true
    },
    {
      id: 3,
      name: "iPad Pro 12.9\"",
      category: "Tablets",
      price: 1099,
      rating: 4.7,
      image: "/images/IMG_1008.png",
      features: ["M2 Chip", "Apple Pencil Support", "5G Capable"],
      inStock: false
    },
    {
      id: 4,
      name: "Apple Watch Ultra 2",
      category: "Smartwatches",
      price: 799,
      rating: 4.6,
      image: "⌚",
      features: ["Titanium Case", "GPS + Cellular", "100m Water Resistant"],
      inStock: true
    },
    {
      id: 5,
      name: "Arduino Uno R4",
      category: "Components",
      price: 27,
      rating: 4.8,
      image: "🤖",
      features: ["WiFi Built-in", "LED Matrix", "USB-C"],
      inStock: true
    },
    {
      id: 6,
      name: "Raspberry Pi 5",
      category: "Components",
      price: 80,
      rating: 4.9,
      image: "🍓",
      features: ["ARM Cortex-A76", "8GB RAM", "Dual 4K HDMI"],
      inStock: true
    }
  ];

  const filteredDevices = selectedCategory === 'All' 
    ? devices 
    : devices.filter(device => device.category === selectedCategory);

  return (
    <section id="devices" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Devices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated collection of premium digital electronics, 
            from flagship smartphones to development boards and everything in between.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDevices.map((device) => (
            <div
              key={device.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Product Image */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center relative">
                <div className="h-48 flex items-center justify-center ">
                    <img
                        src={device.image}
                        alt={device.name}
                        className="max-h-full max-w-full object-contain"
                    />
                </div>


                {!device.inStock && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Out of Stock
                  </div>
                )}
                {device.inStock && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    In Stock
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">{device.name}</h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600">{device.rating}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">${device.price.toLocaleString()}</span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {device.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={!device.inStock}>
                    <ShoppingCart className="w-4 h-4 inline mr-2" />
                    Add to Cart
                  </button>
                  <button className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors">
                    See More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <button className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
            Load More Devices
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurDevices;
