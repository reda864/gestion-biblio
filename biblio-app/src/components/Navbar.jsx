import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';



const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="bg-repeat bg-center text-white shadow-lg sticky top-0 z-50"
      style={{
        backgroundImage:
          'url(https://www.transparenttextures.com/patterns/wood-pattern.png)',
        backgroundColor: '#4E342E',
      }}
    >
      <div className="flex justify-between items-center px-6 md:px-20 py-4">
        {/* Logo + Nom */}
        <div className="flex items-center space-x-4">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16 rounded-full border-2 border-white hover:scale-110 hover:border-[#C0A16B] transition duration-300 "
          />
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-[#FAF3E0]">
            BiblioApp
          </h1>
        </div>

        {/* Menu desktop */}
        <div className="hidden md:flex space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-[#C0A16B] transition">Accueil</Link>
          <Link to="/" className="hover:text-[#C0A16B] transition">services</Link>
          <Link to="/login" className="hover:text-[#C0A16B] transition">Connexion</Link>
          <Link to="/catalogue" className="hover:text-[#C0A16B] transition">Catalogue</Link>
          <Link to="/contact" className="hover:text-[#C0A16B] transition">Contact</Link>
          <Link to="/login" className="hover:text-[#C0A16B] transition">Outils</Link>
        </div>

        {/* Bouton hamburger mobile */}
        <button
          className="md:hidden text-[#FAF3E0] focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {isOpen && (
        <div className="md:hidden px-6 pb-4 flex flex-col space-y-3 text-lg font-medium">
          <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-[#C0A16B] transition">
            Accueil
          </Link>
          <Link to="/catalogue" onClick={() => setIsOpen(false)} className="hover:text-[#C0A16B] transition">
            Catalogue
          </Link>
          <Link to="/login" onClick={() => setIsOpen(false)} className="hover:text-[#C0A16B] transition">
            Connexion
          </Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-[#C0A16B] transition">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
