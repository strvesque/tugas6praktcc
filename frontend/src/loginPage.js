import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveToken } from './utils.js';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.token) {
      saveToken(data.token);
      navigate('/notes');
    } else {
      alert('Login gagal');
    }
  };

  const goToRegister = () => {
    navigate('/register');
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={goToRegister}>Register</button>
      </div>
    </div>
  );
}

export default LoginPage;
