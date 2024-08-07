import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import LoginPage from "../login";

// import Sidebar from "../ui/sidebar";

const Layout = ({ children }: { children: ReactElement }) => {
  const route = useRouter();
  console.log(route);

  const currentRoute = route.asPath;

  if (currentRoute == "/login") {
    // if (cookie && cookie.access_token) {
    return (
      <>
        <LoginPage />
      </>
    );
  }

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
