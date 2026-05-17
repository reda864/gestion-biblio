import React from 'react';

const Sidebar = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-[#a3896d] text-white shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-8">BiblioApp</h2>
      <nav className="flex flex-col space-y-4">
        <a href="/dashboard" className="hover:text-yellow-300">Dashboard</a>
        <a href="/etudiants" className="hover:text-yellow-300">Étudiants</a>
        <a href="/enseignants" className="hover:text-yellow-300">Enseignants</a>
        <a href="/bibliothecaires" className="hover:text-yellow-300">Bibliothécaires</a>
        <a href="/ouvrages" className="hover:text-yellow-300 font-semibold">Ouvrages</a>
      </nav>
    </div>
  );
};

const Button = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`bg-[#a3896d] hover:bg-[#8d7358] text-white font-semibold py-2 px-4 rounded-xl transition duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const GestionOuvrages = () => {
  return (
    <div className="flex">
      {/* Sidebar intégré */}
      <Sidebar />

      {/* Contenu principal */}
      <div className="flex-1 ml-64 p-8 bg-[#f5f1e6] min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-[#5e4b3c]">Gestion des Ouvrages</h1>

        {/* Bouton Ajouter */}
        <div className="mb-6">
          <Button onClick={() => alert('Ajouter un ouvrage')}>Ajouter un ouvrage</Button>
        </div>

        {/* Tableau des ouvrages */}
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#d4c4a8] text-[#5e4b3c]">
              <tr>
                <th className="py-3 px-6 text-left">ID</th>
                <th className="py-3 px-6 text-left">Titre</th>
                <th className="py-3 px-6 text-left">Auteur</th>
                <th className="py-3 px-6 text-left">Année</th>
                <th className="py-3 px-6 text-left">Disponible</th>
                <th className="py-3 px-6 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-[#5e4b3c]">
              <tr className="border-b">
                <td className="py-3 px-6">1</td>
                <td className="py-3 px-6">Le Petit Prince</td>
                <td className="py-3 px-6">Antoine de Saint-Exupéry</td>
                <td className="py-3 px-6">1943</td>
                <td className="py-3 px-6">Oui</td>
                <td className="py-3 px-6 space-x-2">
                  <Button className="bg-yellow-600 hover:bg-yellow-700">Modifier</Button>
                  <Button className="bg-red-600 hover:bg-red-700">Supprimer</Button>
                </td>
              </tr>
              {/* Tu peux ajouter d'autres lignes ici */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GestionOuvrages;
