import React, { useEffect, useState } from 'react';


const Profile = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const username = sessionStorage.getItem('username');

    if (!username) {
      setError('No username found in sessionStorage. Please log in.');
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/user/${username}`);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        
        if (!result || Object.keys(result).length === 0) {
          throw new Error('No user data found');
        }

        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="fetch-data-container">
      {data ? (
        <ul>
          <li>
            <h2>Name: {data.name}</h2>
            <p><span>Email:</span> {data.email}</p>
            <p><span>Phone:</span> {data.phone}</p>
            <p><span>Country:</span> {data.country}</p>
            <p><span>Address:</span> {data.address}</p>
            <p><span>Gender:</span> {data.gender}</p>
          </li>
        </ul>
      ) : (
        <div className="no-data">No user data found</div>
      )}
    </div>
  );
};

export default Profile;
