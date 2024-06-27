import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pages/Test" element={<Test />} />
        <Route path="/pages/Home" element={<Home />} />
        <Route path="/" element={<Home />} />
        {/* Define other routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
