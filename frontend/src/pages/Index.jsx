// ✅ Cleaned-up Index.jsx
import Hero from '../components/Hero';
import OurDevices from '../components/OurDevices';
import LearnElectronics from '../components/LearnElectronics';
import WhyDigitalCore from '../components/WhyDigitalCore';
import BrandCarousel from '../components/BrandCarousel';
import OfferCard from '../components/OfferCard';


const Index = () => {
  return (
   
    <div className="min-h-screen bg-white">
      
        <Hero />
        <OfferCard />
        <OurDevices />
        <BrandCarousel />
        
        <LearnElectronics />
        <WhyDigitalCore />
         
     
    </div>
    
  );
};

export default Index;
