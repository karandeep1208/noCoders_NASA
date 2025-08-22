import HeroBadge from "../components/HeroBadge";
import HeroTitle from "../components/HeroTitle";
import HeroDescription from "../components/HeroDescription";
import HeroCTA from "../components/HeroCTA";
import Image from "../assets/earth.jpg"; // Adjust the path as necessary

const Home = () => {
  return (
    <main className="relative w-full min-h-screen bg-space text-white flex flex-col items-center justify-center">
      {/* Background Earth Image */}
      <div className="absolute inset-0">
        <img
          src={Image}
          alt="Earth Background"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" /> {/* Dark overlay */}
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
};

export default Home;
