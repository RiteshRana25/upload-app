import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS

const App = () => {
  const [formData, setFormData] = useState({
    folder: '',
    name: '',
    cover: ''
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg('');

    try {
      const res = await axios.post('http://localhost:5000/api/images/upload', formData);
      setMsg('✅ Folder uploaded and saved to MongoDB!');
    } catch (error) {
      console.error(error);
      setMsg('❌ Failed to upload folder');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>📤 Upload Cloudinary Folder to MongoDB</h2>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="folder"
          placeholder="📁 Cloudinary Folder Name"
          value={formData.folder}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="📘 Name (e.g. Haldi Decor)"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="cover"
          placeholder="🖼️ Cover Image URL"
          value={formData.cover}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Submit'}
        </button>
      </form>

      {msg && <p className="message">{msg}</p>}
    </div>
  );
};

export default App;
