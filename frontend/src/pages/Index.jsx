// ✅ Cleaned-up Index.jsx
import Hero from '../components/Hero';
import OurDevices from '../components/OurDevices';
import LearnElectronics from '../components/LearnElectronics';
import WhyDigitalCore from '../components/WhyDigitalCore';
import BrandCarousel from '../components/BrandCarousel';
import OfferCard from '../components/OfferCard';

import { SearchProvider, SearchModal } from '../context/SearchContext';

const Index = () => {
  return (
    <SearchProvider>
    <div className="min-h-screen bg-white">
      
        <Hero />
        <OfferCard />
        <OurDevices />
        <BrandCarousel />
        
        <LearnElectronics />
        <WhyDigitalCore />
         <SearchModal />
     
    </div>
     </SearchProvider>
  );
};

export default Index;
