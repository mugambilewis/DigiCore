import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import OurDevices from '../components/OurDevices';
import LearnElectronics from '../components/LearnElectronics';
import ExploreTools from '../components/ExploreTools';
import WhyDigitalCore from '../components/WhyDigitalCore';
import Footer from '../components/Footer';


const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <OurDevices />
			<ExploreTools />
      <LearnElectronics />
			<WhyDigitalCore />
      <Footer />
    </div>
  );
};

export default Index;