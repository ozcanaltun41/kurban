import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const KurbanForm = ({ onAdd }) => {
  const [form, setForm] = useState({
    ad: '',
    agirlik: '',
    alis: '',
    satis: '',
    not: '',
    resim: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({ ...form, [name]: files ? files[0] : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...form,
      id: Date.now(),
      resimURL: form.resim ? URL.createObjectURL(form.resim) : null,
    };
    onAdd(data);
    setForm({ ad: '', agirlik: '', alis: '', satis: '', not: '', resim: null });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8 }}>
      <input placeholder='Kurbanlık Adı' name='ad' value={form.ad} onChange={handleChange} required />
      <input placeholder='Ağırlık (kg)' name='agirlik' type='number' value={form.agirlik} onChange={handleChange} required />
      <input placeholder='Alış Fiyatı' name='alis' type='number' value={form.alis} onChange={handleChange} required />
      <input placeholder='Satış Fiyatı' name='satis' type='number' value={form.satis} onChange={handleChange} required />
      <textarea placeholder='Not' name='not' value={form.not} onChange={handleChange} />
      <input type='file' name='resim' accept='image/*' onChange={handleChange} />
      <button type='submit'>Kurbanlık Ekle</button>
    </form>
  );
};

const KurbanListesi = ({ kurbanliklar }) => (
  <div style={{ marginTop: 20 }}>
    <h3>Kayıtlı Kurbanlıklar</h3>
    {kurbanliklar.map((k) => (
      <div key={k.id} style={{ border: '1px solid #ccc', padding: 10, marginTop: 10 }}>
        {k.resimURL && <img src={k.resimURL} alt='kurban' style={{ width: '100%', maxHeight: 200, objectFit: 'cover' }} />}
        <p><strong>{k.ad}</strong> - {k.agirlik} kg</p>
        <p>Alış: {k.alis} ₺ | Satış: {k.satis} ₺</p>
        <p>{k.not}</p>
      </div>
    ))}
  </div>
);

const Panel = () => {
  const [kurbanliklar, setKurbanliklar] = useState([]);

  const handleAdd = (data) => {
    setKurbanliklar([...kurbanliklar, data]);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Kurbanlık Yönetimi</h1>
      <KurbanForm onAdd={handleAdd} />
      <KurbanListesi kurbanliklar={kurbanliklar} />
    </div>
  );
};

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

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  return loggedIn ? <Panel /> : <Login onLogin={setLoggedIn} />;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
