import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, saveToken } from './utils.js';
import './LoginPage.css';
import backgroundImage from './assets/background.jpeg';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.token) {
      saveToken(data.token);
      navigate('/notes');
    } else {
      alert('Register gagal');
    }
  };

  return (
    <div
      className="app-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        <button
          type="button"
          onClick={() => navigate('/login')}
          style={{ marginTop: '10px' }}
        >
          Sudah punya akun? Login
        </button>
      </form>
    </div>
    </div>
  );
}

export default RegisterPage;
