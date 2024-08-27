import type { ReactElement } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import LoginPage from "../login";
import Dashboard from "../dashboard";
import { useGlobalContext } from "@/context/GlobalContext";
import Spinner from "@/components/spinner";

const Layout = ({
  children,
  user_data,
}: {
  children: ReactElement;
  user_data: any;
}) => {
  const route = useRouter();
  // console.log(route);
  // console.log(user_data);

  const { isLoading } = useGlobalContext();

  const currentRoute = route.asPath;

  const landingPage =
    currentRoute == "/" ? <Dashboard child={undefined} title={""} /> : null;

    // console.log(landingPage)

  if (currentRoute == "/login" || currentRoute == "/login/verify") {
    // if (cookie && cookie.access_token) {
    return (
      <>
        {isLoading && <Spinner />}

        <LoginPage />
      </>
    );
  }

  return (
    <>
      <Header user={user_data} />
      <main>
        <div className=" flex justify-between">
          {isLoading && <Spinner />}

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
