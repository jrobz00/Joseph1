import React from "react";

const Navbar = () => {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-[#0E0F1A] bg-opacity-90 px-6 py-3 rounded-2xl shadow-lg border border-gray-800 z-50">
      <ul className="flex space-x-6 text-white text-lg font-medium">
        <li className="cursor-pointer hover:text-gray-300 transition">About</li>
        <li className="cursor-pointer hover:text-gray-300 transition">Projects</li>
        <li className="cursor-pointer hover:text-gray-300 transition">Testimonials</li>
        <li className="cursor-pointer hover:text-gray-300 transition">Contact</li>
      </ul>
    </nav>
  );
};

export default Navbar;
