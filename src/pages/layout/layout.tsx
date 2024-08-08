import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import LoginPage from "../login";
// import OTPPage from "../login/verify";

// import Sidebar from "../ui/sidebar";

const Layout = ({ children }: { children: ReactElement }) => {
  const route = useRouter();
  console.log(route);

  const currentRoute = route.asPath;

  if (currentRoute == "/login" || currentRoute == "/login/verify") {
    // if (cookie && cookie.access_token) {
    return (
      <>
        <LoginPage />
      </>
    );
  }

  // if (currentRoute == "/login/verify") {
  //   return (
  //     <>
  //       <OTPPage />
  //     </>
  //   );
  // }

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
