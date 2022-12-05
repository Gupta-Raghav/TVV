
import AppRouter  from './Router/AppRouter';

import MultilineChart from "./components/Charts/MultiLine";
import MultiChart from "./components/Charts/MultiChart";
import schc from "./components/Charts/SCHC.json";
import vcit from "./components/Charts/VCIT.json";
import portfolio from "./components/Charts/portfolio.json";
import Landing from "./components/landing/Landing";
import Navbar from "./components/Navbar/navbar";
import SignIn from "./components/Singnin/Signin";

function App() {
  return (
    <div >
      <AppRouter/>
      {/* <MultiChart/> */}
      {/* <AppRouter /> */}
    </div>
  );
}

export default App;
