import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import logo from '../assets/logo.jpg'; // Assure-toi que ce fichier existe
import scienceBook from '../assets/acceuil.jpg';
import { motion } from 'framer-motion';
import openBook3D from '../assets/open-book-3d.png';
import promoVideo from '../assets/vedio_promo.mp4';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-[#f5f0e6] pt-20 flex flex-col justify-between">
      <Navbar />

      <main className="flex flex-col items-center justify-center p-6 flex-1">
        <div className="max-w-4xl text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
           
            <h1 className="text-4xl md:text-5xl font-bold text-[#5b3a29]">
              Bibliothèque Électronique Universitaire 📚
            </h1>
          </div>

          <p className="text-gray-700 text-lg md:text-xl mb-8">
            Une nouvelle façon de gérer vos emprunts, retours, recherches et réservations de livres en toute simplicité.
          </p>
          <div className="flex justify-center">
          <div className="flex justify-center relative mt-6">

          <div className="flex justify-center mt-12">
 
</div>
{/* Vidéo immersive au lieu de l'image */}
<section className="py-20 bg-[#FAF3E0] text-center px-6">
        <div className="max-w-4xl mx-auto">
          <video
            src={promoVideo}
            autoPlay
            loop
            muted
            playsInline
            className="rounded-3xl shadow-2xl mx-auto w-full max-w-3xl mb-10"
          />
          <h3 className="text-3xl md:text-4xl font-bold text-[#4E342E] mb-4">
            Explorez tous les univers de la connaissance 🌍📘
          </h3>
          </div>
</section>
</div>
</div>
        </div>

        <section id="features" className="mt-20 w-full max-w-5xl">
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-[#4a2f21] mb-8">
            Fonctionnalités principales
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Emprunts via QR Code",
                desc: "Empruntez ou retournez un ouvrage en scannant un simple QR Code.",
              },
              {
                title: "Chatbot intelligent",
                desc: "Posez une question comme 'Livres de maths disponibles ?' et obtenez une réponse directe.",
              },
              {
                title: "Suivi des pénalités",
                desc: "Visualisez votre historique d’emprunt et vos pénalités en temps réel.",
              },
              {
                title: "Réservation de livres",
                desc: "Réservez un livre en un clic et évitez les déplacements inutiles.",
              },
              {
              title: "Notifications & Alertes",
              desc: "Recevez des rappels pour les retours et les pénalités.",
              
            },
            {
              title: "Historique personnel",
              desc: "Suivez tous vos emprunts, retours et réservations.",
             
            },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-xl p-6 text-center hover:scale-105 transition-transform border border-[#d6c8b6]"
              >
                <h3 className="text-xl font-semibold text-[#5b3a29] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <div className="flex justify-center gap-4">
           
            <a
              href="#features"
              className="border border-[#5b3a29] text-[#5b3a29] px-6 py-3 rounded-2xl text-lg hover:bg-[#e8dfd4] transition"
            >
              En savoir plus
            </a>
          </div>


      <footer className="bg-[#4a2f21] text-white text-center p-4 mt-12">
        <p>&copy; 2025 Bibliothèque Universitaire. Tous droits réservés.</p>
      </footer>
    </div>
  );
};

export default HomePage;
