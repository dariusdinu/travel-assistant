import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useMemo, useState } from "react";

export const AuthContext = createContext({
  token: null,
  user: null,
  isSignedIn: false,
  authenticate: async () => {},
  signOut: async () => {},
});

function AuthContextProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);

  async function authenticate(token, userData) {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", userData);
    setAccessToken(token);
    setUser(userData);
  }

  async function signOut() {
    setAccessToken(null);
    setUser(null);
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
  }

  const currentUser = useMemo(
    () => ({
      token: accessToken,
      user: user,
      isSignedIn: !!accessToken,
      authenticate,
      signOut,
    }),
    [accessToken, user]
  );

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
}

export default AuthContextProvider;
