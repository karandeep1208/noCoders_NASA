import HeroBadge from "../components/HeroBadge";
import HeroTitle from "../components/HeroTitle";
import HeroDescription from "../components/HeroDescription";
import HeroCTA from "../components/HeroCTA";
import Image from "../assets/earth.jpg"; // Make sure this path is correct

const NAVBAR_HEIGHT = 60; // px, adjust if needed

const Home = () => (
  <main className={`relative w-full min-h-screen bg-space text-white flex flex-col items-center justify-center pt-[${NAVBAR_HEIGHT}px]`}>
    {/* Background Earth Image */}
    <div className="absolute inset-0">
      <img
        src={Image}
        alt="Earth Background"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/50" />
    </div>

    {/* Hero Content */}
    <div className="relative z-10 text-center px-4 space-y-6 max-w-3xl">
      <HeroBadge />
      <HeroTitle />
      <HeroDescription />
      <HeroCTA />
    </div>
  </main>
);

export default Home;
