import HeroBadge from "../components/HeroBadge";
import HeroTitle from "../components/HeroTitle";
import HeroDescription from "../components/HeroDescription";
import HeroCTA from "../components/HeroCTA";
import Image from "../assets/earth.jpg";
import Footer from "../components/Footer";

const NAVBAR_HEIGHT = 60;

const Home = () => (
  <main className={`relative w-full min-h-screen bg-space text-white flex flex-col items-center justify-center pt-[${NAVBAR_HEIGHT}px]`}>
    {/* Background Earth Image */}
    <div className="flex flex-col min-h-screen">
    {/* Hero Section */}
    <section className="relative w-full flex flex-col items-center justify-start min-h-screen">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={Image} alt="Earth Background" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center mt-32 px-4 space-y-6 max-w-3xl">
        <HeroBadge />
        <HeroTitle />
        <HeroDescription />
        <HeroCTA />
      </div>
    </section>

    {/* Footer Section */}
    <Footer />
  </div>
  </main>
);

export default Home;
