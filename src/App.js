import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VotingHomePage from './VotingHomePage';
import LoginPage from './LoginPage';
import ResultadosPage from './Resultados.js';

import PrivateRoute from './PrivateRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VotingHomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resultados" element={
          <PrivateRoute>
            <ResultadosPage />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}
