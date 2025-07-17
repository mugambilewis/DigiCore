import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  CreditCard, Lock, Truck, MapPin, Phone, Mail, ArrowRight
} from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.user);

  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const orderItems = [
    { id: 1, name: 'iPhone 15 Pro Max', price: 1199, quantity: 1, image: '/placeholder.svg' },
    { id: 2, name: 'AirPods Pro (2nd Gen)', price: 249, quantity: 1, image: '/placeholder.svg' },
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 29;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  useEffect(() => {
    if (!currentUser) navigate('/login');
  }, [currentUser, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData(prev => ({ ...prev, [name]: value }));
  };

  const handleContinue = () => {
    if (currentStep < 3) setCurrentStep(prev => prev + 1);
    else {
      // Submit order (this is where you'd hook into your backend)
      console.log("✅ Placing order:", { user: currentUser, shippingData, orderItems });
      alert("Order placed successfully!");
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 font-inter">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">DigiCore</h1>
          <div className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-green-500" />
            <span className="text-sm text-gray-600">Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white border-b py-6">
        <div className="max-w-7xl mx-auto flex justify-center space-x-8">
          {[
            { step: 1, label: 'Shipping', icon: Truck },
            { step: 2, label: 'Payment', icon: CreditCard },
            { step: 3, label: 'Review', icon: ArrowRight }
          ].map(({ step, label }) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${currentStep >= step ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className={`ml-2 text-sm ${currentStep >= step ? 'text-blue-600 font-semibold' : 'text-gray-500'}`}>
                {label}
              </span>
              {step < 3 && (
                <div className={`w-16 h-1 mx-4 ${currentStep > step ? 'bg-blue-500' : 'bg-gray-200'}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 px-6 py-10">
        {/* Left Side */}
        <div>
          {currentStep === 1 && (
            <div className="bg-white p-8 rounded-2xl shadow-soft border">
              <h2 className="text-xl font-semibold flex items-center mb-6">
                <MapPin className="h-5 w-5 mr-2 text-blue-500" /> Shipping Information
              </h2>
              <form className="grid grid-cols-2 gap-4">
                <Input label="First Name" name="firstName" value={shippingData.firstName} onChange={handleInputChange} />
                <Input label="Last Name" name="lastName" value={shippingData.lastName} onChange={handleInputChange} />
                <Input label="Email" name="email" type="email" icon={<Mail />} value={shippingData.email} onChange={handleInputChange} />
                <Input label="Phone" name="phone" icon={<Phone />} value={shippingData.phone} onChange={handleInputChange} />
                <Input label="Address" name="address" value={shippingData.address} onChange={handleInputChange} full />
                <Input label="City" name="city" value={shippingData.city} onChange={handleInputChange} />
                <Input label="State" name="state" value={shippingData.state} onChange={handleInputChange} />
                <Input label="Zip Code" name="zipCode" value={shippingData.zipCode} onChange={handleInputChange} />
                <Input label="Country" name="country" value={shippingData.country} onChange={handleInputChange} />
              </form>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bg-white p-8 rounded-2xl shadow-soft border">
              <h2 className="text-xl font-semibold flex items-center mb-6">
                <CreditCard className="h-5 w-5 mr-2 text-blue-500" /> Payment Details
              </h2>
              <p className="text-gray-600 text-sm">You can implement Stripe, PayPal, or manual bank details here.</p>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="sticky top-8 bg-white p-8 rounded-2xl shadow-soft border">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {orderItems.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg bg-gray-100 object-cover" />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">${item.price}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 space-y-3 text-sm text-gray-600">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>${shipping.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <div className="border-t pt-3 flex justify-between font-semibold text-gray-900 text-base">
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="mt-8 w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-200 group flex justify-center items-center"
          >
            {currentStep === 1 ? "Continue to Payment" : currentStep === 2 ? "Review Order" : "Place Order"}
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-sm text-gray-500 mt-6 flex justify-center space-x-6 border-t pt-6">
            <div className="flex items-center"><Lock className="h-4 w-4 mr-1" /> SSL Secure</div>
            <div className="flex items-center"><Truck className="h-4 w-4 mr-1" /> Free Returns</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = ({ label, name, value, onChange, type = 'text', icon = null, full = false }) => (
  <div className={`col-span-${full ? '2' : '1'}`}>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      {icon && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full py-3 pl-${icon ? '10' : '4'} pr-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 bg-white/50 backdrop-blur-sm`}
        required
      />
    </div>
  </div>
);

export default Checkout;
