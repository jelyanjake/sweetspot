import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import menuIcon from '../assets/menu-burger.png';
import usersIcon from '../assets/users.png'
import timeIcon from '../assets/user-time.png';
import regIcon from '../assets/clipboard-list.png';
import './menupopup.css';

const MenuPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="menu-container" ref={menuRef}>
      <button 
        className="menu-button" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <img src={menuIcon} alt="" />
      </button>

      {isOpen && (
        <div className="popup">
          <ul>
          <li onClick={() => handleItemClick('/')}>
              <img src={timeIcon} alt="Time" className="menu-icon" />
              <span>Time In/Out</span>
            </li>
            <li onClick={() => handleItemClick('/register')}>
              <img src={regIcon} alt="Register" className="menu-icon" />
              <span>Register</span>
            </li>
            <li onClick={() => handleItemClick('/users')}>
              <img src={usersIcon} alt="Users" className="menu-icon" />
              <span>Users</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuPopup;