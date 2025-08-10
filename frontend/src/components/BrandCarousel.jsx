import React from 'react';

const BrandCarousel = () => {
  const brands = [
    { name: 'SONY', src: '/images/Sony logo.png' },
    { name: 'APPLE', src: '/images/Apple logo.png' },
    { name: 'SAMSUNG', src: '/images/Samsung logo.png' },
    { name: 'LG', src: '/images/LG logo.png' },
    { name: 'HUAWEI', src: '/images/Huawei logo.png' },
    { name: 'HP', src: '/images/HP logo.png' },
    { name: 'LENOVO', src: '/images/Lenovo logo.png' },
    { name: 'DELL', src: '/images/Dell logo.png' },
    { name: 'MICROSOFT', src: '/images/Microsoft logo.png' },
    { name: 'ASUS', src: '/images/Asus logo.png' },
  ];

  return (
    <div className="relative overflow-hidden bg-blue-200 backdrop-blur-lg py-8">
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
      
      {/* Scrolling Row */}
      <div className="flex w-max animate-marquee">
        {[...brands, ...brands].map((brand, index) => (
          <div
            key={index}
            className="flex items-center justify-center min-w-[140px] md:min-w-[180px] lg:min-w-[220px] h-20 bg-blue-100 rounded-2xl md:h-24 lg:h-28 mx-6 transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] cursor-pointer"
          >
            <img
              src={brand.src}
              alt={brand.name}
              className="max-h-16 max-w-36 object-contain px-2 md:max-h-20 lg:max-h-24"
            />
          </div>
        ))}
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-blue-300 to-transparent pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-300 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default BrandCarousel;