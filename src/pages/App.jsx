// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";  // Make sure these paths are correct
import Hero from "../components/Hero";
import Dashboard from "./Dashboard";   // Dashboard page from src/pages
import Auth from "./Auth";             // Auth page (login/register) from src/pages

function App() {
  return (
    <Router>
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
