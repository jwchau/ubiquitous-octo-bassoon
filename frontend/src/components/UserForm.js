import React, { useState, useEffect } from 'react';

function UserForm({ user, onCreated, onUpdated, onCancel }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
    } else {
      setName('');
      setEmail('');
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/users${
        user ? '/' + user.id : ''
      }`;
      const res = await fetch(apiUrl, {
        method: user ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Failed to save user');
      }
      const saved = await res.json();
      if (user) {
        onUpdated && onUpdated(saved);
      } else {
        onCreated && onCreated(saved);
      }
      setName('');
      setEmail('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>{user ? 'Edit user' : 'Create user'}</h3>
      <div>
        <label>Name:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">{user ? 'Save' : 'Create'}</button>
      {user && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default UserForm;
