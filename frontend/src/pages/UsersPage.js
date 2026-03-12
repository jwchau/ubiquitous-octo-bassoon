import React, { useState, useEffect } from 'react';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/users`;
    const res = await fetch(apiUrl);
    if (res.ok) {
      setUsers(await res.json());
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreated = (u) => setUsers((prev) => [...prev, u]);
  const handleUpdated = (u) => {
    setUsers((prev) => prev.map((x) => (x.id === u.id ? u : x)));
    setEditing(null);
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/users/${id}`;
    await fetch(apiUrl, { method: 'DELETE' });
    setUsers((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div>
      <UserForm
        user={editing}
        onCreated={handleCreated}
        onUpdated={handleUpdated}
        onCancel={() => setEditing(null)}
      />
      <UserList users={users} onEdit={(u) => setEditing(u)} onDelete={handleDelete} />
    </div>
  );
}

export default UsersPage;
