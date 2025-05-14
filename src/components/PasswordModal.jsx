import { useState } from 'react';
import './PasswordModal.css';
import { useNavigate } from 'react-router-dom';

export const PasswordModal = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const user1 = 'katarinabluu';
  const pass1 = 'imwinter';

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