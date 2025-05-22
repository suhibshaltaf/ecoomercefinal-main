import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

// Create context
export let UserContext = createContext(null);

// Context Provider
export function UserContextProvider({ children }) {
  let [userToken, setUserToken] = useState(null);
  let [userData, setUserData] = useState(null);
  let [loading, setLoading] = useState(true);

  // Load token from localStorage if it exists
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setUserToken(token);
    } else {
      setLoading(false); // stop loading if there's no token
    }
  }, []);

  // Get user data from the backend
  const getUserData = async () => {
    if (!userToken) return;

    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Tariq__${userToken}`,
          },
        }
      );
      setUserData(data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data when token changes
  useEffect(() => {
    getUserData();
  }, [userToken]);

  // Provide context values
  return (
    <UserContext.Provider
      value={{ userToken, setUserToken, userData, setUserData, loading }}
    >
      {children}
    </UserContext.Provider>
  );
}