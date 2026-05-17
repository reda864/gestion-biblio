import React, { useState } from "react";
import Navbar from "../components/Navbar"; // ajuste le chemin si nécessaire

const categories = {
  "Droit Public": ["Droit Constitutionnel", "Droit Administratif"],
  "Droit Privé": ["Droit Civil", "Droit Commercial"],
  "Économie": ["Microéconomie", "Macroéconomie"],
  "Les Thèses": ["Mémoire", "Thèse Doctorale"],
  "Les Revues": ["Juridique", "Économique"]
};

const booksData = [
  { title: "Introduction au Droit Constitutionnel", category: "Droit Public", subject: "Droit Constitutionnel" },
  { title: "Les Obligations", category: "Droit Privé", subject: "Droit Civil" },
  { title: "Économie Internationale", category: "Économie", subject: "Macroéconomie" },
  { title: "Analyse Juridique Avancée", category: "Les Thèses", subject: "Thèse Doctorale" },
  { title: "Revue Économique 2024", category: "Les Revues", subject: "Économique" },
];

const Input = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-2 focus:ring-[#8B5E3C]"
  />
);

const Button = ({ children, onClick }) => (
  <button
    onClick={onClick}
    className="bg-[#8B5E3C] text-white px-6 py-2 rounded-xl shadow hover:bg-[#6b432b] transition duration-200"
  >
    {children}
  </button>
);

const Card = ({ children }) => (
  <div className="border border-gray-200 rounded-2xl shadow-lg bg-white p-4">{children}</div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-4 ${className}`}>{children}</div>
);

export default function BookReservationPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);

  const handleFilter = () => {
    const filtered = booksData.filter(
      (book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        book.category === selectedCategory &&
        book.subject === selectedSubject
    );
    setFilteredBooks(filtered);
  };

  const handleReserve = (bookTitle) => {
    alert(`Vous avez réservé le livre : ${bookTitle}`);
  };

  return (
    <>
      <Navbar />
      <div className="p-8 space-y-6 bg-[#fdf6ee] min-h-screen">
        <h1 className="text-4xl font-extrabold text-[#4a2f21] tracking-tight">📚 Réservez Votre Livre</h1>

        <div className="flex flex-col md:flex-row md:items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Recherche</label>
            <Input
              placeholder="Chercher un livre par nom"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Catégorie</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-2 focus:ring-[#8B5E3C]"
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                setSelectedSubject("");
              }}
            >
              <option value="">-- Choisir une catégorie --</option>
              {Object.keys(categories).map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Matière</label>
            <select
              className="border border-gray-300 rounded-lg p-2 w-full shadow-sm focus:ring-2 focus:ring-[#8B5E3C]"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="">-- Choisir une matière --</option>
              {selectedCategory && categories[selectedCategory].map((subj) => (
                <option key={subj} value={subj}>{subj}</option>
              ))}
            </select>
          </div>

          <div className="self-start md:self-end">
            <Button onClick={handleFilter}>Filtrer</Button>
          </div>
        </div>

        <Card>
          <CardContent>
            {filteredBooks.length === 0 ? (
              <p className="text-gray-500 italic">Aucun livre trouvé.</p>
            ) : (
              <table className="w-full text-left border mt-2 table-auto">
                <thead className="bg-[#f1e7dc]">
                  <tr className="border-b">
                    <th className="p-3 text-sm font-semibold text-gray-700">Titre</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">Catégorie</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">Matière</th>
                    <th className="p-3 text-sm font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBooks.map((book, index) => (
                    <tr key={index} className="border-b hover:bg-[#f7f2eb] transition">
                      <td className="p-3 text-sm text-gray-800">{book.title}</td>
                      <td className="p-3 text-sm text-gray-800">{book.category}</td>
                      <td className="p-3 text-sm text-gray-800">{book.subject}</td>
                      <td className="p-3 text-sm text-gray-800">
                        <Button onClick={() => handleReserve(book.title)}>Réserver</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>

      <footer className="bg-[#4a2f21] text-white text-center p-4 mt-12">
        <p>&copy; 2025 Bibliothèque Universitaire. Tous droits réservés.</p>
      </footer>
    </>
  );
}
