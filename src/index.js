import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Kurban Panel (Vercel Yayında)</h1>
      <p>Admin Giriş ve Kurban Yönetim Paneli burada olacak.</p>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
