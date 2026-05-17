import React, { useState } from "react";
import AdminLayout from "../components/layouts/AdminLayout";

const GestionEnseignants = () => {
  const [teachers, setTeachers] = useState([
    {
      id: 1,
      nom: "Martin",
      prenom: "Paul",
      email: "paul.martin@example.com",
      role: "Enseignant",
    },
    {
      id: 2,
      nom: "Bernard",
      prenom: "Claire",
      email: "claire.bernard@example.com",
      role: "Enseignant",
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newTeacher, setNewTeacher] = useState({ nom: "", prenom: "", email: "" });
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [searchId, setSearchId] = useState("");

  const handleInputChange = (e, isEdit = false) => {
    const { name, value } = e.target;
    if (isEdit) {
      setEditingTeacher({ ...editingTeacher, [name]: value });
    } else {
      setNewTeacher({ ...newTeacher, [name]: value });
    }
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const newId = teachers.length + 1;
    const newEntry = { id: newId, ...newTeacher, role: "Enseignant" };
    setTeachers([...teachers, newEntry]);
    setShowAddModal(false);
    setNewTeacher({ nom: "", prenom: "", email: "" });
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher({ ...teacher });
    setShowEditModal(true);
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    const updatedList = teachers.map((t) =>
      t.id === editingTeacher.id ? editingTeacher : t
    );
    setTeachers(updatedList);
    setShowEditModal(false);
    setEditingTeacher(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Supprimer cet enseignant ?")) {
      setTeachers(teachers.filter((t) => t.id !== id));
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Gestion des enseignants</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-xl shadow"
          >
            <span className="text-xl">➕</span>
            Ajouter un enseignant
          </button>
        </div>

        <div className="mb-4 w-1/2">
          <input
            type="number"
            placeholder="Rechercher par ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="border border-gray-300 rounded-xl px-4 py-2 w-full"
          />
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-2xl w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nom</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Prénom</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Rôle</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {teachers
                .filter((teacher) =>
                  searchId === "" ? true : teacher.id === parseInt(searchId)
                )
                .map((teacher) => (
                  <tr key={teacher.id}>
                    <td className="px-6 py-4">{teacher.id}</td>
                    <td className="px-6 py-4">{teacher.nom}</td>
                    <td className="px-6 py-4">{teacher.prenom}</td>
                    <td className="px-6 py-4">{teacher.email}</td>
                    <td className="px-6 py-4">{teacher.role}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditClick(teacher)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-xl flex items-center gap-1"
                        >
                          <span className="text-xl">✏️</span>
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(teacher.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl flex items-center gap-1"
                        >
                          <span className="text-xl">🗑️</span>
                          Supprimer
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Modal Ajouter */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowAddModal(false)}
              >
                <span className="text-xl">❌</span>
              </button>
              <h2 className="text-xl font-bold mb-4">Ajouter un enseignant</h2>
              <form onSubmit={handleAddSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={newTeacher.nom}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={newTeacher.prenom}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded-xl"
                >
                  Ajouter
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal Modifier */}
        {showEditModal && editingTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowEditModal(false)}
              >
                <span className="text-xl">❌</span>
              </button>
              <h2 className="text-xl font-bold mb-4">Modifier l'enseignant</h2>
              <form onSubmit={handleUpdateSubmit} className="space-y-4">
                <input
                  type="text"
                  name="nom"
                  placeholder="Nom"
                  value={editingTeacher.nom}
                  onChange={(e) => handleInputChange(e, true)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
                <input
                  type="text"
                  name="prenom"
                  placeholder="Prénom"
                  value={editingTeacher.prenom}
                  onChange={(e) => handleInputChange(e, true)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={editingTeacher.email}
                  onChange={(e) => handleInputChange(e, true)}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2"
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-xl"
                >
                  Modifier
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default GestionEnseignants;
