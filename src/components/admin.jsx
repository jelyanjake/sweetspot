import { useState, useEffect } from 'react';
import './admin.css';

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users');
        const data = await response.json();
        setUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.idnum.includes(searchTerm)
  );

  const activeUsers = users.filter(user => user.isActive).length;
  const inactiveUsers = users.length - activeUsers;

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`https://67f50ba7913986b16fa2f9ff.mockapi.io/api/v1/users/${userId}`, {
          method: 'DELETE'
        });
        setUsers(users.filter(user => user.id !== userId));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <section id="users">
      <div className="container">
        <div className="section-title">
          <div className="userlog">
            <h2>User Statistics</h2>
            <div className="parent">
              <div className="div1">
                <p>{users.length}</p>
                <p>Number of Users</p>
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
                      <th>ID Number</th>
                      <th>Name</th>
                      <th>Phone</th>
                      <th>Status</th>
                      <th>Last Action</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map(user => (
                      <tr key={user.id}>
                        <td>{user.idnum}</td>
                        <td>{user.name}</td>
                        <td>{user.phone}</td>
                        <td>
                          <span className={`status-badge ${user.isActive ? 'active' : 'inactive'}`}>
                            {user.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>{user.lastAction ? new Date(user.lastAction).toLocaleString() : 'Never'}</td>
                        <td>
                          <button className="view-btn">View Logs</button>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDelete(user.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminPage;