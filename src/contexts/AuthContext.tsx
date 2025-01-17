import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { authService } from '../api/authService';


type AuthContextType = {
  user?: string;
  password?: string;
  userData: User;
  statusAuth: StatusAuth;
  setStatusAuth: Dispatch<SetStateAction<StatusAuth>>
  login: (userData: string, password: string) => void;
  logout: () => void;
};

export type User = {
  id?: number,
  name?: string,
  token?: string
}

export type StatusAuth = {
  error: boolean,
  message?: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const defaultUser: User = { id: undefined, name: undefined, token: undefined }
export const defaultStatusAuth: StatusAuth = { error: false, message: undefined }


export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<string| undefined>(undefined);
  const [password, setPassword] = useState<string| undefined>(undefined);
  const [userData, setUserData] = useState<User>(defaultUser);
  const [statusAuth, setStatusAuth] = useState<StatusAuth>(defaultStatusAuth);


  useEffect(() => {
    const loadStoredData = () => {
      try {
        AsyncStorage.getItem('user').then((storedUser) => {
          setUser(storedUser ? storedUser : "");
        });
        AsyncStorage.getItem('password').then((password) => {
          setPassword(password ? password : "");
        });
        AsyncStorage.getItem('userData').then((userData) => {
          setUserData(userData ? JSON.parse(userData) : defaultUser);
        });
      } catch (e) {
        console.error('Error loading data from AsyncStorage', e);
      }
    };
    loadStoredData();
  }, []);

  const login = async (user: string, password: string) => {
    await AsyncStorage.setItem('user', user);
    await AsyncStorage.setItem('password', password);
    setUser(user);
    setPassword(password);
    await authService.login(user, password).then((resp) => {
      if (!resp.error && typeof resp.reponse != "string") {
        setUserData(resp.reponse)
        AsyncStorage.setItem('userData', JSON.stringify(resp.reponse));
        setStatusAuth({ error: false, message: "Login Efetuado com sucesso." });
      } else {
        AsyncStorage.removeItem('userData');
        setUserData(defaultUser)
        setStatusAuth(resp);
      }
    });
  };

  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('userData');
    setUser(undefined);
    setPassword(undefined);
    setStatusAuth(defaultStatusAuth);
    setUserData(defaultUser);
  };

  return (
    <AuthContext.Provider value={{ user, password, userData, statusAuth, setStatusAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
