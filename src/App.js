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
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("dark", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("dark", "false");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      toggleDarkMode(true);
    }
  }, [toggleDarkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <WithNavBar>
                <Landing />
              </WithNavBar>
            }
          />
          <Route
            path="/Landing"
            element={
              <WithNavBar>
                <Landing />
              </WithNavBar>
            }
          />
          <Route
            path="/Resources"
            element={
              <WithNavBar>
                <Resources />
              </WithNavBar>
            }
          />
          <Route
            path="/Contact"
            element={
              <WithNavBar>
                <Contact />
              </WithNavBar>
            }
          />
          <Route
            path="/License"
            element={
              <WithNavBar>
                <License />
              </WithNavBar>
            }
          />
          <Route
            path="/FinancialProfile"
            element={
              <WithNavBar>
                <FinancialProfile />
              </WithNavBar>
            }
          />
          <Route
            path="/About"
            element={
              <WithNavBar>
                <About />
              </WithNavBar>
            }
          />
          <Route
            path="/Comp"
            element={
              <WithNavBar>
                <Comp />
              </WithNavBar>
            }
          />
          <Route
            path="/Goals"
            element={
              <WithNavBar>
                <Goals />
              </WithNavBar>
            }
          />
          <Route
            path="/Wealth"
            element={
              <WithNavBar>
                <Wealth />
              </WithNavBar>
            }
          />

          <Route path="/expense-tracker" element={<LogIn />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Routes>
      </Router>
    </div>
  );

  function WithNavBar({ children }) {
    return (
      <div className="">
        <NavigationBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        {children}
      </div>
    );
  }
}

export default App;
