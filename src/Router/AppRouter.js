import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import About from "../components/about/about";
import RaceTrend from "../components/Trends/RaceTrend";
import SeasonsTrend from "../components/Trends/SeasonsTrend";
// import Projects from "../components/Projects/Projects";
// import Footer from "./components/Footer";
// import Resume from "./components/Resume/ResumeNew";
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
          <Route path="/Seasons" element={<SeasonsTrend />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;