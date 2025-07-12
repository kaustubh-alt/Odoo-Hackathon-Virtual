import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('rewear_user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate authentication
    const user = mockUsers.find(u => u.email === email);
    if (user) {
      // In a real app, you'd verify the password here
      setCurrentUser(user);
      localStorage.setItem('rewear_user', JSON.stringify(user));
      return { success: true, user };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (email, password, name) => {
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'User already exists' };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      avatar: `https://via.placeholder.com/150/${Math.floor(Math.random()*16777215).toString(16)}/ffffff?text=${name.charAt(0).toUpperCase()}`,
      points: 100, // Starting points
      role: 'user',
      joinDate: new Date().toISOString().split('T')[0],
      itemsCount: 0,
      swapsCompleted: 0
    };

    // In a real app, you'd save this to a database
    mockUsers.push(newUser);
    setCurrentUser(newUser);
    localStorage.setItem('rewear_user', JSON.stringify(newUser));
    
    return { success: true, user: newUser };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('rewear_user');
  };

  const updateUserPoints = (points) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, points: currentUser.points + points };
      setCurrentUser(updatedUser);
      localStorage.setItem('rewear_user', JSON.stringify(updatedUser));
    }
  };

  const updateUserStats = (itemsCount, swapsCompleted) => {
    if (currentUser) {
      const updatedUser = { 
        ...currentUser, 
        itemsCount: currentUser.itemsCount + (itemsCount || 0),
        swapsCompleted: currentUser.swapsCompleted + (swapsCompleted || 0)
      };
      setCurrentUser(updatedUser);
      localStorage.setItem('rewear_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateUserPoints,
    updateUserStats,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 