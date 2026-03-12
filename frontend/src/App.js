import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/health`);
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        setStatus('API connection failed');
      }
    };

    checkAPI();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Events App</h1>
      <p>Status: {status}</p>
      <p>Frontend is running!</p>
    </div>
  );
}

export default App;
