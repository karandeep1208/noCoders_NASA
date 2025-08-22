import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import QuickStats from "./components/QuickStats";
import SDGDashboard from "./components/SDG/SDGDashboard";
import DataSources from "./components/DataSources";
// import Footer from "./components/Footer";

const App = () => {
  const [activeSDG, setActiveSDG] = useState("13");
  const [selectedRegion, setSelectedRegion] = useState("global");

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <Hero />
      <QuickStats />
      <SDGDashboard
        activeSDG={activeSDG}
        setActiveSDG={setActiveSDG}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      <DataSources />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
