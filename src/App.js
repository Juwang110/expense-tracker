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
import NotFound from "./pages/NotFound"
import { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";
import NavigationBar from "./components/NavigationBar";


// Root component that tracks dark mode and page navigation
function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggles DarkMode on/off given a boolean
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

  // On run remembers if the system is in dark mode from local storage
  // and toggles it based on that
  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      toggleDarkMode(true);
    }
  }, [toggleDarkMode]);

  // Function to display the navbar on top of the children component
  function WithNavBar({ children }) {
    return (
      <div className="">
        <NavigationBar toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
        {children}
      </div>
    );
  }

  // Renders all routes and route names for page navigation.
  // By default includes the navbar on all pages except log in
  return (
    <div className={darkMode ? "dark" : ""}>
      <Router>
        <Routes>
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
          <Route path="/" element={<LogIn />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
