import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import LoginPage from './loginPage.js';
import RegisterPage from './registerPage.js';
import NotesPage from './NotesPage.js';
import { isLoggedIn } from './utils.js';
import reportWebVitals from './reportWebVitals';

const PrivateRoute = ({ children }) => {
  return isLoggedIn() ? children : <Navigate to="/login" />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/notes" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/notes"
          element={
            <PrivateRoute>
              <NotesPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
