import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/HomePage";

const App = () => {
  return (
    <Router>
      {/* Navbar visible on all pages */}
      <Navbar />

      {/* Main content */}
      <div className="pt-24 bg-space min-h-screen text-white">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
