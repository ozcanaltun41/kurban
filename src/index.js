import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '123456') {
      onLogin(true);
    } else {
      alert('Hatalı giriş!');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 100 }}>
      <h2>Admin Girişi</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: 300, gap: 10 }}>
        <input placeholder='Kullanıcı Adı' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Şifre' value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type='submit'>Giriş Yap</button>
      </form>
    </div>
  );
};

const Panel = () => (
  <div style={{ padding: 20 }}>
    <h1>Kurban Panel</h1>
    <p>Giriş başarılı! Şimdi kurbanlıkları ve hisseleri buradan yöneteceğiz.</p>
  </div>
);

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Panel /> : <Login onLogin={setLoggedIn} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
