import React from "react";
import { useParams, Link } from "react-router-dom";
import devices from "../data/devices.json";
import { useSelector } from "react-redux";

const DeviceDetails = () => {
  const { id } = useParams();
  const device = devices.find((d) => d.id.toString() === id);
 
  const cartItems = useSelector((state) => state.cart.items);
  const item = cartItems.find((item) => item.id.toString() === id);

  if (!device) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl text-red-500">!</span>
            </div>
            <h2 className="text-3xl font-bold text-red-500 mb-3">Device Not Found</h2>
            <p className="text-gray-600 text-lg">The device you're looking for doesn't exist.</p>
          </div>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-lg transition-colors"
          >
            <span>←</span> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-blue-600 mb-6 tracking-tight">Device Details</h1>
          
          {/* Cart Badge */}
          <div className="inline-flex items-center gap-3 bg-white px-8 py-4 rounded-full shadow-sm border border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-full">
              <span className="text-blue-600 font-bold text-lg">{item.quantity}</span>
            </div>
            <p className="text-gray-950 font-semibold text-lg">
              <span className="italic text-gray-500 font-normal">
                {item.quantity} {item.name}{item.quantity > 1 ? 's' : ''}
              </span> in your cart
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12">
            
            {/* Device Image Section */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="w-full bg-gray-50 rounded-xl p-8 flex items-center justify-center">
                <img 
                  src={device.image} 
                  alt={device.name} 
                  className="w-full max-w-sm object-contain hover:scale-105 transition-transform duration-300" 
                />
              </div>
              <div className="inline-block bg-blue-50 px-6 py-2 rounded-full">
                <p className="text-sm font-semibold text-blue-600 uppercase tracking-wide">
                  {device.category}
                </p>
              </div>
            </div>

            {/* Device Info Section */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  {device.name}
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {device.description || "No description available."}
                </p>
              </div>

              {/* Price */}
              <div className="bg-blue-50 inline-block self-start px-6 py-3 rounded-xl">
                <span className="text-3xl font-bold text-blue-600">
                  Ksh {device.price.toLocaleString()}
                </span>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Key Features
                </h3>
                <ul className="space-y-3">
                  {device.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                      <span className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </span>
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Back Button */}
              <div className="pt-4">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg"
                >
                  <span>←</span> Back to Devices
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceDetails;