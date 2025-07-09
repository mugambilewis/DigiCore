// ✅ Cleaned-up Index.jsx
import Hero from '../components/Hero';
import OurDevices from '../components/OurDevices';
import LearnElectronics from '../components/LearnElectronics';
import ExploreTools from '../components/ExploreTools';
import WhyDigitalCore from '../components/WhyDigitalCore';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <OurDevices />
      <ExploreTools />
      <LearnElectronics />
      <WhyDigitalCore />
    </div>
  );
};

export default Index;
