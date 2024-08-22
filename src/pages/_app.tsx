import { GlobalProvider } from "@/context/GlobalContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
// import Layout from "./layout/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalProvider>
      {/* <Layout> */}
        <Component {...pageProps} />
      {/* </Layout> */}
    </GlobalProvider>
  );
}
