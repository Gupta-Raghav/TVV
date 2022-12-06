import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import About from "../components/about/about";
import RaceTrend from "../components/Trends/RaceTrend";
import SeasonsTrend from "../components/Trends/SeasonsTrend";
import District from "../components/Trends/District";
import PercenChange from "../components/Trends/percechange";
// import Projects from "../components/Projects/Projects";
// import Footer from "./components/Footer";
// import Resume from "./components/Resume/ResumeNew";
import Vehicle from '../components/Trends/Vehicle.js';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom";
import Landing from "../components/landing/Landing";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [load, upadateLoad] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      upadateLoad(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} exact={true}/>
          <Route path="/about" element={<About />} />
          <Route path="/Race" element={<RaceTrend />} />
          <Route path="/Vehicle Manufacturer Safety" element={<Vehicle />} />
          <Route path="/Safety of District" element={<District/>} />
          <Route path="/Seasons Trends" element={<SeasonsTrend />} />
          <Route path="/Violation Trend" element={<PercenChange />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;