import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import LoginPage from "../login";
import Dashboard from "../dashboard";

const Layout = ({ children }: { children: ReactElement }) => {
  const route = useRouter();
  console.log(route);

  const currentRoute = route.asPath;

  const landingPage =
    currentRoute == "/" ? <Dashboard child={null} title={""} /> : null;

  if (currentRoute == "/login" || currentRoute == "/login/verify") {
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
          {landingPage ? landingPage : null}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
