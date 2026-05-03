import { createContext, useState, useEffect } from "react";

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    const parsed = JSON.parse(storedUser);

    // ✅ only set valid user
    if (parsed && parsed.username) {
      setAccount(parsed);
    } else {
      // ❌ remove bad data (like signup response)
      localStorage.removeItem("user");
      setAccount(null);
    }
  } else {
    setAccount(null);
  }
}, []);

  return (
    <DataContext.Provider
      value={{
        account,
        setAccount,
        loginOpen,
        setLoginOpen,
        drawerOpen,
        setDrawerOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
