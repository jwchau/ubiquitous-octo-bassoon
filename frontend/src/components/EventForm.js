import React, { useState, useEffect } from 'react';

function EventForm({ users, event, onCreated, onUpdated, onCancel }) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDate(event.date || '');
      setUserId(event.userId || '');
    } else {
      setTitle('');
      setDate('');
      setUserId('');
    }
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const apiUrl = `${process.env.REACT_APP_API_URL}/api/events${
        event ? '/' + event.id : ''
      }`;
      const res = await fetch(apiUrl, {
        method: event ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, date, userId: Number(userId) }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error || 'Failed to save event');
      }
      const saved = await res.json();
      if (event) {
        onUpdated && onUpdated(saved);
      } else {
        onCreated && onCreated(saved);
      }
      setTitle('');
      setDate('');
      setUserId('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <h3>{event ? 'Edit event' : 'Create event'}</h3>
      <div>
        <label>Title:</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label>User:</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          <option value="">-- select --</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={!users.length}>{event ? 'Save' : 'Create'}</button>
      {event && (
        <button type="button" onClick={onCancel} style={{ marginLeft: '0.5rem' }}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default EventForm;
