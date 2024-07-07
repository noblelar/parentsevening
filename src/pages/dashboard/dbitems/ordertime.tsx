import React from "react";
import { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data01 = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];
const data02 = [
  { name: "A1", value: 100 },
  { name: "A2", value: 300 },
  { name: "B1", value: 100 },
  { name: "B2", value: 80 },
  { name: "B3", value: 40 },
  { name: "B4", value: 30 },
  { name: "B5", value: 50 },
  { name: "C1", value: 100 },
  { name: "C2", value: 200 },
  { name: "D1", value: 150 },
  { name: "D2", value: 50 },
];

const OrderTime = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Order Time</h2>
      <p className="text-gray-600">From 1-6 Dec, 2020</p>
      <div className="mt-4 h-64 ">
        {/* Placeholder for pie chart */}
        
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              data={data01}
              dataKey="value"
              cx="50%"
              cy="50%"
              outerRadius={60}
              fill="#8884d8"
            />
            <Tooltip/>
            <Pie
              data={data02}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={90}
              fill="#82ca9d"
              label
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex justify-around mt-2 text-sm text-gray-600">
          <div>Afternoon 40%</div>
          <div>Evening 32%</div>
          <div>Morning 28%</div>
        </div>
      </div>
    </div>
  );
};

export default OrderTime;
