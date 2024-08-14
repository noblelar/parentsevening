"use client";

import { type } from "os";
// import { useSession } from "next-auth/react";
import {
  Dispatch,
  createContext,
  SetStateAction,
  ReactNode,
  useState,
} from "react";
import Spinner from "@/components/spinner";

import { usePathname, useRouter } from "next/navigation";

type ContextType = {
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

const initialState = {
  loading: false,
  setLoading: () => {},
};

export const GlobalContext = createContext<ContextType>(initialState);

export default function GlobalState({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  return (
    <GlobalContext.Provider value={{ loading, setLoading }}>
      {children}
    </GlobalContext.Provider>
  );
}
