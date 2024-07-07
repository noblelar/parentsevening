import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
// import Sidebar from "../ui/sidebar";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Header />
      <main>
        <div className=" flex justify-between">
          <Sidebar />
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
