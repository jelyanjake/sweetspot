import { useState, useEffect } from 'react';
import './admin.css';
import { PasswordModal } from './PasswordModal';
import EditModal from './EditModal';
import AddModal from './AddModal';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  

  useEffect(() => {
    if (isAuthenticated) {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }
  }, [isAuthenticated]);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this establishment?')) {
      try {
        await fetch(`https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/${userId}`, {
          method: 'DELETE'
        });
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const response = await fetch(
        `https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers/${editingUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...editingUser,
            ...updatedData
          })
        }
      );
      
      if (response.ok) {
        setUsers(users.map(user => 
          user.id === editingUser.id ? { ...user, ...updatedData } : user
        ));
        setEditingUser(null);
      }
    } catch (error) {
      console.error('Error updating:', error);
    }
  };

  const handleAddEstablishment = async (newData) => {
    try {
      const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/burgers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newData,
          parking: [], // Default empty parking array
          status: 0, // Default status
          isActive: false // Default active status
        })
      });
      
      if (response.ok) {
        const createdUser = await response.json();
        setUsers([...users, createdUser]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('Error adding establishment:', error);
    }
  };

  if (!isAuthenticated) {
      return (
        <PasswordModal 
          onSuccess={() => setIsAuthenticated(true)}
        />
      );
    }

  return (
    <section id="users">
      <div className="container">
        <div className="section-title">
          <div className="userlog">
            <h2>System Statistics</h2>
            <div className="parent">
              <div className="div1">
                <p>{users.length}</p>
                <p>Number of Establishments</p>
              </div>
              <div className="div2">
                <p>{activeUsers}</p>
                <p>Active</p>
              </div>
              <div className="div3">
                <p>{inactiveUsers}</p>
                <p>Inactive</p>
              </div>
              <div className="div4">
                <button className="add-btn" onClick={() => setShowAddModal(true)}>Add Establishment</button>
                <input
                  type="text"
                  placeholder="Search by name or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <hr />
            
            {loading ? (
              <div className='loading-spinner'></div>
            ) : (
              <div className="user-table">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Spots</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.description}</td>
                        <td>{user.spots}</td>
                        <td>
                          <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <button className="view-btn" onClick={() => setEditingUser(user)}>Edit Place</button>
                          <button className="delete-btn" onClick={() => handleDelete(user.id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
        {editingUser && (
          <EditModal
            user={editingUser}
            onSave={handleSaveEdit}
            onCancel={() => setEditingUser(null)}
          />
        )}
        {showAddModal && (
    <AddModal
      onSave={handleAddEstablishment}
      onCancel={() => setShowAddModal(false)}
    />
  )}
      </div>
    </section>
  );
}

export default AdminPage;