import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./layout/layout";
// import Layout from "./components/layout/layout";
// import "@/styles/sidebar.css";
// import "@/styles/header.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
