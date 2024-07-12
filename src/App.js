import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogIn from "./pages/LogIn";
import Landing from "./pages/Landing";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import License from "./pages/License";
import FinancialProfile from "./pages/FinancialProfile";
import About from "./pages/About";
import Wealth from "./pages/Wealth";
import Comp from "./pages/Comparison";
import Goals from "./pages/Goals";
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import NavigationBar from "./components/NavigationBar";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = (isDarkMode) => {
    setDarkMode(isDarkMode);
  };

  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      toggleDarkMode(true);
    }
  }, [toggleDarkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <div className="px-20">
          <NavigationBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        </div>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/Landing" element={<Landing />} />
          <Route path="/expense-tracker" element={<LogIn />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Resources" element={<Resources />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/License" element={<License />} />
          <Route path="/FinancialProfile" element={<FinancialProfile />} />
          <Route path="/About" element={<About />} />
          <Route path="/Comp" element={<Comp />} />
          <Route path="/Goals" element={<Goals />} />
          <Route path="/Wealth" element={<Wealth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
