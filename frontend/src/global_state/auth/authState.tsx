import { AuthInitialState, User } from "@/types"; // Adjust this import based on your actual path
import { useEffect, useState } from "react";
import authContext from "./authContext";

// Initial state setup
export const initialState: AuthInitialState = {
    auth: false,
    user: null,
    accessToken: null,
    refreshToken: null,
};

// Function to get initial state from localStorage or return default initial state
const getInitialState = (): AuthInitialState => {
  if (typeof window !== "undefined") {
    const storedAuth = localStorage.getItem("auth");
    return storedAuth ? JSON.parse(storedAuth) : initialState;
  }
  return initialState;
};

const AuthProvider = (props: any) => {
  const [authState, setAuthState] = useState<AuthInitialState>(getInitialState);
  const [initialized, setInitialized] = useState(false);

  // Effect for initializing state from localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && !initialized) {
      setInitialized(true); // Ensures this initialization block runs only once
    }
  }, [initialized]);

  // Effect for syncing state changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && initialized) {
      localStorage.setItem("auth", JSON.stringify(authState));
    }
  }, [authState, initialized]);


  return (
    <authContext.Provider
      value={{
        auth: authState.auth,
        user: authState.user,
        accessToken: authState.accessToken,
        refreshToken: authState.refreshToken
      }}
    >
      {props.children}
    </authContext.Provider>
  );
};

export default AuthProvider;