import React from 'react';
import { Button } from '@/components/ui/button';
import { Section } from 'lucide-react';

const OfferCard = () => {
  return (
   
    <div className="mt-20 relative min-h-[80vh] mx-12 sm:mx-20 md:mx-24 lg:mx-28 p-4 lg:p-6  overflow-hidden flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Exclusive Offer!
          </h2>
    <div className=" rounded-3xl flex items-center justify-center overflow-hidden p-4 lg:p-6 bg-gradient-to-br from-[hsl(220,30%,5%)] via-[hsl(240,20%,8%)] to-[hsl(260,25%,10%)]">
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-2 lg:px-4 h-full flex items-center">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-4 lg:space-y-6 text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-3 lg:space-y-4">
              <div className="inline-block">
                <span className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs md:text-sm font-bold px-3 py-1.5 rounded-full animate-pulse">
                  LIMITED TIME OFFER
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight">
                Samsung Galaxy
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  S24 Ultra
                </span>
              </h1>
              
              <p className="text-gray-300 text-sm md:text-base lg:text-lg max-w-md mx-auto lg:mx-0">
                Experience the future of mobile technology with cutting-edge AI features and unparalleled performance.
              </p>
            </div>
            
            {/* Pricing */}
            <div className="space-y-1">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-lg md:text-xl lg:text-2xl text-gray-400 line-through">$1,299</span>
                <span className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white">$974</span>
              </div>
              <p className="text-green-400 text-sm md:text-base font-semibold">Save 25% - $325 OFF</p>
            </div>
            
            {/* CTA Button */}
            <div className="pt-2 lg:pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 lg:py-4 lg:px-8 rounded-full text-sm lg:text-base transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] group"
              >
                <span className="flex items-center gap-2">
                  Grab Offer Now
                  <svg className="w-4 h-4 lg:w-5 lg:h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </div>
            
            {/* Additional Info */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 lg:gap-4 text-xs lg:text-sm text-gray-400">
              <span>✓ Free Shipping</span>
              <span>✓ 2-Year Warranty</span>
              <span>✓ 30-Day Returns</span>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative order-1 lg:order-2 flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
              <img 
                src="/public/images/Device on offer.png" 
                alt="Samsung Galaxy S24 Ultra" 
                className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
   </div>
  );
};

export default OfferCard;