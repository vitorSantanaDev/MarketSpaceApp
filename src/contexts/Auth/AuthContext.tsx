import { createContext, useContext, useEffect, useState } from "react";
import {
  AuthContextStateType,
  SignInRequestPayload,
  AuthContextProviderProps,
} from "./types";
import { api } from "@services/api";
import { UserDTO } from "@dtos/user.dto";

import {
  saveAuthTokenOnStorage,
  getAuthTokenFromStorage,
  removeAuthTokenFromStorage,
} from "@storage/auth-token-storage";
import {
  saveUserOnStorage,
  getUserFromStorage,
  removeUserFromStorage,
} from "@storage/user-storage";

const AuthContext = createContext<AuthContextStateType>(
  {} as AuthContextStateType
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [loadingUserData, setLoadingUserData] = useState(false);
  const [user, setUser] = useState({} as UserDTO);

  function userAndTokenUpdate(payload: { user: UserDTO; token: string }) {
    api.defaults.headers.common["Authorization"] = `Bearer ${payload.token}`;
    setUser(payload.user);
  }

  async function signIn(payload: SignInRequestPayload) {
    try {
      setLoadingUserData(true);
      const { data } = await api.post("/sessions", { ...payload });

      if (data.user && data.token && data.refresh_token) {
        await saveUserOnStorage(data.user);
        await saveAuthTokenOnStorage({
          token: data.token,
          refresh_token: data.refresh_token,
        });
        userAndTokenUpdate({ user: data.user, token: data.token });
        setUser(data.user);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  async function signOut() {
    try {
      setLoadingUserData(true);
      setUser({} as UserDTO);
      await removeUserFromStorage();
      await removeAuthTokenFromStorage();
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  async function loadUserFromStorage() {
    try {
      setLoadingUserData(true);
      const userLogged = await getUserFromStorage();
      const { token } = await getAuthTokenFromStorage();

      if (token && userLogged) {
        userAndTokenUpdate({ user: userLogged, token });
      }
    } catch (error) {
      throw error;
    } finally {
      setLoadingUserData(false);
    }
  }

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, [signOut]);

  return (
    <AuthContext.Provider value={{ user, loadingUserData, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }

  return context;
}
