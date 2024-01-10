import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/authentication/profile");
        console.log("response: ", response);
        setUser(response.data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setReady(true);
      }
    };
    fetchUserData();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, ready, setReady }}>
      {children}
    </UserContext.Provider>
  );
}
