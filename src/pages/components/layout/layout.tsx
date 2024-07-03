import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "../ui/sidebar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <Sidebar/>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
