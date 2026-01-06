import React, { createContext, useContext, useState, useEffect } from 'react';

interface ConsentContextType {
  consent: {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
  };
  updateConsent: (type: string, value: boolean) => void;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

export const ConsentManager: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [consent, setConsent] = useState({
    necessary: true, // Always true
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Load consent from localStorage
    const saved = localStorage.getItem('user-consent');
    if (saved) {
      setConsent(JSON.parse(saved));
    }
  }, []);

  const updateConsent = (type: string, value: boolean) => {
    const newConsent = { ...consent, [type]: value };
    setConsent(newConsent);
    localStorage.setItem('user-consent', JSON.stringify(newConsent));
  };

  return (
    <ConsentContext.Provider value={{ consent, updateConsent }}>{children}</ConsentContext.Provider>
  );
};

export const useConsent = () => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentManager');
  }
  return context;
};

export default ConsentManager;
