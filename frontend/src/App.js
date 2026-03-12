import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Events App</h1>
        <nav>
          <Link to="/users" style={{ marginRight: '1rem' }}>Users</Link>
          <Link to="/events">Events</Link>
        </nav>
        <hr />
        <Routes>
          <Route path="/users" element={<UsersPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route
            path="/"
            element={<p>Welcome! Choose a section above.</p>}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
