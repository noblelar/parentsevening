import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import LoginPage from "../login";
import Dashboard from "../dashboard";

const Layout = ({
  children,
  user_data,
}: {
  children: ReactElement;
  user_data: any;
}) => {
  const route = useRouter();
  console.log(route);
  // console.log(user_data);

  const currentRoute = route.asPath;

  const landingPage =
    currentRoute == "/" ? <Dashboard child={undefined} title={""} /> : null;

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
      <Header user={user_data} />
      <main>
        <div className=" flex justify-between">
          <Sidebar user={user_data} />
          {children}
          {landingPage ? landingPage : null}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Layout;
