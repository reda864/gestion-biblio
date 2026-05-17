import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AuthPage from '../pages/AuthPage';
import AdminDashboard from '../pages/AdminDashboard';
import GestionEtudiants from '../pages/GestionEtudiants';
import GestionEnseignants from '../pages/GestionEnseignants';
import GestionBibliothecaires from '../pages/GestionBibliothecaires'; 

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/catalogue" element={<HomePage />} />
        <Route path="/contact" element={<HomePage />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/etudiants" element={<GestionEtudiants />} />
        <Route path="/admin/enseignants" element={<GestionEnseignants />} />
        <Route path="/admin/bibliothecaires" element={<GestionBibliothecaires />} />

        
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;