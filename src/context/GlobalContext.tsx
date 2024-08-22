// context/GlobalContext.tsx
import React, { createContext, useState, useContext, ReactNode } from "react";
import { useRouter } from "next/router";

// Define the context types
interface GlobalContextProps {
  globalValue: any;
  setGlobalValue: React.Dispatch<React.SetStateAction<any>>;
  globalEvening: any;
  setGlobalEvening: React.Dispatch<React.SetStateAction<any>>;
  isLoading: boolean; // To track the loading state
}

// Create the context
const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

// Create a provider component
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [globalValue, setGlobalValue] = useState<any>();
  const [globalEvening, setGlobalEvening] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  // Listen to route changes to show/hide loader with a minimum 1.5s delay
  React.useEffect(() => {
    let timer: NodeJS.Timeout;

    const handleStart = () => {
      setIsLoading(true);
    };

    const handleComplete = () => {
      const minimumLoadingTime = 0;
      const startTime = Date.now();

      // Ensure loader stays visible for at least 1.5s
      timer = setTimeout(() => {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime >= minimumLoadingTime) {
          setIsLoading(false);
        }
      }, minimumLoadingTime);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
      clearTimeout(timer); 
    };
  }, [router]);

  return (
    <GlobalContext.Provider value={{ globalValue, setGlobalValue, globalEvening, setGlobalEvening, isLoading }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};


