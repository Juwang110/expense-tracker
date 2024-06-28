import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Test from "./pages/Test";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import Account from "./pages/Account";
import Landing from "./pages/Landing";

import "tailwindcss/tailwind.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Test" element={<Test />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/expense-tracker" element={<Landing />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Account" element={<Account />} />
        {/* Define other routes if needed */}
      </Routes>
    </Router>
  );
}

export default App;
