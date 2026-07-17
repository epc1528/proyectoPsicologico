import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        // Validación básica de expiración del JWT (payload en base64)
        const payloadBase64 = storedToken.split('.')[1];
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const currentTime = Date.now() / 1000;
        
        if (decodedPayload.exp < currentTime) {
          // El token expiró
          console.warn("Sesión expirada");
          logout();
        } else {
          setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        // Token inválido
        logout();
      }
    }
  }, []);

  const login = (userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
