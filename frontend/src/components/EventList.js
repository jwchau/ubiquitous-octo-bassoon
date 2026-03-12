import React from 'react';

function EventList({ events, users, onEdit, onDelete }) {
  if (!events || events.length === 0) {
    return <p>No events yet.</p>;
  }
  const lookup = users.reduce((acc, u) => { acc[u.id] = u; return acc; }, {});
  return (
    <div>
      <h3>Events</h3>
      <ul>
        {events.map((e) => (
          <li key={e.id} style={{ marginBottom: '0.5rem' }}>
            {e.title} ({e.date}) by {lookup[e.userId]?.name || 'unknown'}{' '}
            <button onClick={() => onEdit && onEdit(e)}>Edit</button>{' '}
            <button onClick={() => onDelete && onDelete(e.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventList;
