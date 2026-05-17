import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className={`w-full md:w-64 bg-gray-900 text-white p-4 md:block ${sidebarOpen ? 'block' : 'hidden'} md:relative`}>
        <h2 className="text-xl font-bold mb-6 text-center">Admin Dashboard</h2>
        <nav className="flex flex-col gap-3 mt-4">
          <Link
            to="/admin/users"
            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition duration-300"
          >
            <span className="text-2xl">👥</span>
            <span className="text-sm font-medium text-white">Gestion des Users</span>
          </Link>
        </nav>
      </aside>

      {/* Toggle Button for Mobile */}
      <div className="md:hidden bg-[#D2B48C] p-4 text-white flex justify-between items-center">
        <h2 className="text-lg font-bold">Admin Dashboard</h2>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <span className="text-2xl">☰</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <header className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
          <h1 className="text-xl md:text-2xl font-semibold">Admin Panel</h1>
          <div className="flex gap-4 items-center text-gray-700 text-sm md:text-base">
            <span className="cursor-pointer hover:text-black">⚙️ Profile</span>
            <span className="cursor-pointer hover:text-black" onClick={handleLogout}>🚪 Logout</span>
          </div>
        </header>

        <main className="p-4 md:p-8">
          <h2 className="text-lg md:text-xl font-semibold mb-6 text-center md:text-left">
            Bienvenue sur le tableau de bord administrateur
          </h2>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Étudiants */}
            <Link
              to="/admin/etudiants"
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-green-500"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-green-600 text-4xl mb-4">👨‍🎓</span>
                <h3 className="text-lg font-semibold text-green-600 mb-2">Gestion des Étudiants</h3>
                <p className="text-gray-600 text-sm">Ajoutez, modifiez ou supprimez les étudiants.</p>
              </div>
            </Link>

            {/* Enseignants */}
            <Link
              to="/admin/enseignants"
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-blue-500"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-blue-600 text-4xl mb-4">🎓</span>
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Gestion des Enseignants</h3>
                <p className="text-gray-600 text-sm">Gérez les profils des enseignants.</p>
              </div>
            </Link>

            {/* Bibliothécaires */}
            <Link
              to="/admin/bibliothecaires"
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6 border-t-4 border-purple-500"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-purple-600 text-4xl mb-4">📖</span>
                <h3 className="text-lg font-semibold text-purple-600 mb-2">Gestion des Bibliothécaires</h3>
                <p className="text-gray-600 text-sm">Ajoutez, modifiez ou supprimez les bibliothécaires.</p>
              </div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
