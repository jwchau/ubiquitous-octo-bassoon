import React, { useState, useEffect } from 'react';

function App() {
  const [status, setStatus] = useState('Loading...');

  useEffect(() => {
    const checkAPI = async () => {
      try {
        const apiUrl = `${process.env.REACT_APP_API_URL}/api/health`;
        console.log('Fetching from:', apiUrl);
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          console.error('Response is not JSON:', text.substring(0, 100));
          throw new Error('Backend returned non-JSON response');
        }
        
        const data = await response.json();
        setStatus(data.status);
      } catch (error) {
        console.error('API Error:', error);
        setStatus(`API connection failed: ${error.message}`);
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
