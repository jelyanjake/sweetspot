import { useState } from 'react';
import './PasswordModal.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../h';

export const PasswordModal = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchData = async () => {
      try {
        const response = await axios.get(API);
        users = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

  const user1 = users.name;
  const pass1 = users.password;

  const onClose = () => {
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === pass1 && user === user1) {
      onSuccess();
    } else {
      setError('Incorrect user or password');
    }
  };

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Admin Panel</h3>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="user"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            placeholder="Enter admin username"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};