import React, { createContext, useState } from 'react';

export const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [user, setUser] = useState(null);

  const value = { user, setUser };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
