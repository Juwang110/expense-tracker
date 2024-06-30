import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Account from "./pages/Account";
import Landing from "./pages/Landing";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import License from "./pages/License";
import Settings from "./pages/Settings";
import FinancialProfile from "./pages/FinancialProfile";
import About from "./pages/About";
import Wealth from "./pages/Wealth";
import Breakdown from "./pages/Breakdown";
import Comp from "./pages/Comparison";

import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/expense-tracker" element={<LogIn />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Account" element={<Account />} />
        <Route path="/Resources" element={<Resources />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/License" element={<License />} />
        <Route path="/FinancialProfile" element={<FinancialProfile />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/About" element={<About />} />
        <Route path="/Comp" element={<Comp />} />
        <Route path="/Breakdown" element={<Breakdown />} />
        <Route path="/Wealth" element={<Wealth />} />

        {/* Define other routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
