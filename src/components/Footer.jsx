
import React from 'react';
import { User, ShoppingCart, Book, Search } from 'lucide-react';

const Footer = () => {
  const footerLinks = {
    Products: [
      'Smartphones',
      'Laptops',
      'Tablets',
      'Smartwatches',
      'Components',
      'DIY Kits'
    ],
    Learning: [
      'Getting Started',
      'Arduino Tutorials',
      'Raspberry Pi',
      'IoT Projects',
      'PCB Design',
      'Code Examples'
    ],
    Support: [
      'Help Center',
      'Contact Us',
      'Shipping Info',
      'Returns',
      'Warranty',
      'Technical Support'
    ],
    Company: [
      'About Us',
      'Careers',
      'Press',
      'Blog',
      'Privacy Policy',
      'Terms of Service'
    ]
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">
              Digital<span className="text-blue-400">Core</span>
            </h3>
            <p className="text-gray-300 mb-6">
              Your gateway to digital innovation. Explore, learn, and build the future of technology.
            </p>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <span className="text-lg">📧</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <span className="text-lg">🐦</span>
              </div>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                <span className="text-lg">📱</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-lg font-semibold mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-16 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-2xl font-bold mb-2">Stay Updated</h4>
              <p className="text-gray-300">
                Get the latest electronics news, tutorials, and exclusive offers delivered to your inbox.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-white"
              />
              <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 DigitalCore. All rights reserved.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="grid grid-cols-4 py-2">
          <button className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs">Search</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600 transition-colors">
            <Book className="w-6 h-6 mb-1" />
            <span className="text-xs">Learn</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingCart className="w-6 h-6 mb-1" />
            <span className="text-xs">Cart</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-600 hover:text-blue-600 transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Account</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
