import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar"; // Adjust path if needed
import Hero from "../components/Hero";       // Adjust path if needed
import Dashboard from "./Dashboard";         // Dashboard page from src/pages
import Auth from "./Auth";                   // Auth page (login/register) from src/pages

function App() {
  return (
    <Router>
      {/* If you want Navbar on all pages, you can include it here */}
      <div className="bg-black min-h-screen">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
