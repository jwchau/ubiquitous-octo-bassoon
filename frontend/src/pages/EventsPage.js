import React, { useState, useEffect } from 'react';
import EventForm from '../components/EventForm';
import EventList from '../components/EventList';

function EventsPage() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [editing, setEditing] = useState(null);

  const loadUsers = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/users`;
    const res = await fetch(apiUrl);
    if (res.ok) setUsers(await res.json());
  };
  const loadEvents = async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/events`;
    const res = await fetch(apiUrl);
    if (res.ok) setEvents(await res.json());
  };

  useEffect(() => {
    loadUsers();
    loadEvents();
  }, []);

  const handleCreatedEvent = (e) => setEvents((prev) => [...prev, e]);
  const handleUpdatedEvent = (e) => {
    setEvents((prev) => prev.map((x) => (x.id === e.id ? e : x)));
    setEditing(null);
  };
  const handleDeleteEvent = async (id) => {
    if (!window.confirm('Delete event?')) return;
    const apiUrl = `${process.env.REACT_APP_API_URL}/api/events/${id}`;
    await fetch(apiUrl, { method: 'DELETE' });
    setEvents((prev) => prev.filter((x) => x.id !== id));
  };

  return (
    <div>
      <EventForm
        users={users}
        event={editing}
        onCreated={handleCreatedEvent}
        onUpdated={handleUpdatedEvent}
        onCancel={() => setEditing(null)}
      />
      <EventList
        events={events}
        users={users}
        onEdit={(e) => setEditing(e)}
        onDelete={handleDeleteEvent}
      />
    </div>
  );
}

export default EventsPage;
