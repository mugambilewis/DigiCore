
import React from 'react';
import { Check, Star, Users, Shield } from 'lucide-react';

const WhyDigitalCore = () => {
  const benefits = [
    {
      icon: <Star className="w-8 h-8 text-blue-600" />,
      title: "Premium Quality",
      description: "Every product is carefully selected and tested to meet our high standards for performance and reliability."
    },
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: "Expert Community",
      description: "Join thousands of electronics enthusiasts sharing knowledge, projects, and supporting each other."
    },
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Warranty & Support",
      description: "Comprehensive warranty coverage and dedicated technical support for all your purchases."
    }
  ];

  const features = [
    "Free shipping on orders over $50",
    "30-day money-back guarantee",
    "Expert technical support",
    "Exclusive member discounts",
    "Early access to new products",
    "Free learning resources and tutorials"
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose DigitalCore?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're more than just an electronics store. We're your partner in innovation, 
            learning, and building the future of technology.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Benefits */}
          <div className="space-y-8">
            {benefits.map((benefit, index) => (
              <div key={benefit.title} className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Features List */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">What You Get</h3>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={feature} className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <Check className="w-6 h-6 text-green-500" />
                  </div>
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-8 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600">99.8%</div>
                  <div className="text-gray-600">Customer Satisfaction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">24/7</div>
                  <div className="text-gray-600">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-blue-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
            <p className="text-xl mb-8 opacity-90">
              Join the DigitalCore community today and unlock a world of possibilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Browse Products
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Start Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyDigitalCore;
