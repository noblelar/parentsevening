import React from "react";
import Button from "./button";
import { dashboardNavList } from "@/utils/datasamples";
import { useRouter } from "next/router";

const navlist = dashboardNavList;

const DashboardNav = () => {
  const cur_route = useRouter();

  return (
    <div className=" w-full bg-primary_dark sticky top-[0px] z-20 ">
      <div className=" container m-auto flex justify-center p-2 space-x-2 ">
        {navlist.map((nav_item, id) => {
          if ((nav_item.pathname == cur_route.pathname)) {
            return (
              <Button
                key={id}
                onClick={() => {}}
                text={nav_item.text}
                pathname={""}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default DashboardNav;
