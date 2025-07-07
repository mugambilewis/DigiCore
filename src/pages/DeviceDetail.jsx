import React from "react";
import { useParams, Link } from "react-router-dom";
import devices from "../data/devices.json";
import { useSelector } from "react-redux";




const DeviceDetails = () => {
  const { id } = useParams();
  const device = devices.find((d) => d.id.toString() === id);
 
  const cartItems = useSelector((state) => state.cart.items);
  // Find the item in the cart that matches the device ID
  const item = cartItems.find((item) => item.id.toString() === id);


  if (!device) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-red-500">Device Not Found</h2>
        <p className="text-gray-600 mt-2">The device you’re looking for doesn’t exist.</p>
        <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline font-semibold">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <>
      
    <section className="max-w-4xl mx-auto px-4 py-20 flex flex-col">
      <div className="flex-1 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Device Details</h1>
        
        </div>
      <div className="flex-1 text-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">
  You have {item.quantity} {item.name}{item.quantity > 1 ? 's' : ''} in your cart
</h2>

      </div>
     
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Device Image */}
        <div className="flex-1 text-center">
          <img src={device.image} alt={device.name} className="w-full max-w-xs mx-auto object-contain" />
          <p className="mt-4 text-sm text-gray-500">{device.category}</p>
        </div>

        {/* Device Info */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{device.name}</h1>
          <p className="text-lg text-gray-700 mb-4">{device.description || "No description available."}</p>
          <div className="mb-6">
            <span className="text-2xl font-bold text-blue-600">${device.price.toLocaleString()}</span>
          </div>

          <ul className="mb-6 space-y-2">
            {device.features.map((feature, idx) => (
              <li key={idx} className="flex items-center text-gray-700">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span> {feature}
              </li>
            ))}
          </ul>

          <Link
            to="/"
            className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Devices
          </Link>
        </div>
      </div>
    </section>
    </>
  );
};

export default DeviceDetails;
