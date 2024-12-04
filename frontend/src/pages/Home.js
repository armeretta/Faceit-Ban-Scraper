// frontend/src/Home.js
import React, { useEffect, useState } from 'react';

function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make a request to the backend
    fetch('http://localhost:5000') // Backend is running on port 5000
      .then(response => response.text())
      .then(data => setMessage(data))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div>
      <h1>Frontend React App</h1>
      <p>{message}</p>
    </div>
  );
}

export default Home;