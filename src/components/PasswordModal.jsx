import { useState } from 'react';
import './PasswordModal.css';
import { useNavigate } from 'react-router-dom';

export const PasswordModal = ({ onSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const onClose = () => {
    navigate('/');
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === 'qweqwe123123') {
      onSuccess();
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div className="password-modal-overlay">
      <div className="password-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h3>Admin Access Required</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};