import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Filter, Star, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import devices from "../data/devices.json";

const OurDevices = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(6);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const categories = [
    "All",
    "Smartphones",
    "Laptops",
    "Tablets",
    "Smartwatches",
    "Components",
  ];

  const filteredDevices =
    selectedCategory === "All"
      ? devices
      : devices.filter((device) => device.category === selectedCategory);

  const getQuantity = (id) => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const handleSeeLess = () => {
    setVisibleCount(6);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setVisibleCount(6); // Reset to 6 when category changes
  };

  const displayedDevices = filteredDevices.slice(0, visibleCount);
  const hasMore = visibleCount < filteredDevices.length;
  const showSeeLess = visibleCount > 6;

  return (
    <section id="devices" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Devices
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our curated collection of premium digital electronics — from flagship smartphones to smartwatches, laptops, and components.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedDevices.map((device) => (
            <div
              key={device.id}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Device Image */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 text-center relative">
                <div className="h-48 flex items-center justify-center">
                  <img
                    src={device.image}
                    alt={device.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Stock Badge */}
                <div
                  className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold text-white ${
                    device.inStock ? "bg-green-500" : "bg-red-500"
                  }`}
                >
                  {device.inStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              {/* Device Info */}
              <div className="p-6">
                {/* Title & Rating */}
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-900">
                    {device.name}
                  </h3>
                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm text-gray-600">
                      {device.rating}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    Ksh {device.price.toLocaleString()}
                  </span>
                </div>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {device.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => dispatch(addToCart(device))}
                    disabled={!device.inStock}
                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4 inline mr-2" />
                    {getQuantity(device.id) > 0
                      ? `Added (${getQuantity(device.id)})`
                      : "Add to Cart"}
                  </button>
                  <Link
                    to={`/device/${device.id}`}
                    className="px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More / See Less */}
        <div className="text-center mt-16">
          <div className="flex gap-4 justify-center">
            {hasMore && (
              <button 
                onClick={handleSeeMore}
                className="bg-gray-100 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                See More Devices
              </button>
            )}
            {showSeeLess && (
              <button 
                onClick={handleSeeLess}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                See Less
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDevices;