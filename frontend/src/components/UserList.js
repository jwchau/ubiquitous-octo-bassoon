import React from 'react';

function UserList({ users, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return <p>No users yet.</p>;
  }
  return (
    <div>
      <h3>Users</h3>
      <ul>
        {users.map((u) => (
          <li key={u.id} style={{ marginBottom: '0.5rem' }}>
            {u.name} &lt;{u.email}&gt;{' '}
            <button onClick={() => onEdit && onEdit(u)}>Edit</button>{' '}
            <button onClick={() => onDelete && onDelete(u.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
