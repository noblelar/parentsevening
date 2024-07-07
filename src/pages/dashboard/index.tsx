import React from "react";
import Revenue from "./dbitems/revenue";
import OrderTime from "./dbitems/ordertime";
import Rating from "./dbitems/rating";
import MostOrderedFood from "./dbitems/mostorderedFood";
import Orders from "./dbitems/orders";
import Link from "next/link";
import Button from "../components/ui/button";

const Dashboard = () => {
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8 ">
      <div className=" w-full bg-primary_dark sticky top-[0px] z-20 ">
        <div className=" container m-auto flex justify-center p-2 ">
          <Button onClick={() => {}} text="Create an Evening" />
          {/* <div className=" ">
            <Link href={"#"} className=" max-w-8 ">
              <p className="   text- ">Create an Evening</p>
            </Link>
          </div> */}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Revenue />
        <OrderTime />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Rating />
        <MostOrderedFood />
      </div>
      <Orders />
    </div>
  );
};

export default Dashboard;
