import { useState } from 'react';
import './admin.css'; // Reuse your existing CSS

const EditModal = ({ user, onSave, onCancel }) => {
  const [editFormData, setEditFormData] = useState({
    name: user.name,
    description: user.description,
    price: user.price,
    spots: user.spots
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editFormData);
  };

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <h3>Edit {user.name}</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <input
              type="text"
              name="description"
              value={editFormData.description}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Parking Fee:</label>
            <input
              type="text"
              name="price"
              value={editFormData.price}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Spots:</label>
            <input
              type="text"
              name="spots"
              value={editFormData.spots}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="button" onClick={onCancel}>Cancel</button>
            <button type="submit">Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;