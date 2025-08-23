import React from 'react';
import Header from './components1/Header';
import Hero from './components1/Hero';
import Dashboard from './components1/Dashboard';
import DataSources from './components1/DataSources';
import Footer from './components1/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <Dashboard />
      <DataSources />
      <Footer />
    </div>
  );
}

export default App;