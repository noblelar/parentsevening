import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
