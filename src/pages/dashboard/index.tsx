import React from "react";
import Revenue from "./dbitems/revenue";
import OrderTime from "./dbitems/ordertime";
import Rating from "./dbitems/rating";
import MostOrderedFood from "./dbitems/mostorderedFood";
import Orders from "./dbitems/orders";
import Link from "next/link";
import Button from "@/components/ui/button";
import DashboardNav from "@/components/ui/dashboardnav";
// import Button from "../components/ui/button";

const Dashboard = () => {
  return (
    <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8 ">
      <DashboardNav/>
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
