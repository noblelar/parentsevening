import React from "react";

const OrderTime = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Order Time</h2>
      <p className="text-gray-600">From 1-6 Dec, 2020</p>
      <div className="mt-4">
        {/* Placeholder for pie chart */}
        <div className="h-32 bg-gray-200 rounded-full mx-auto"></div>
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
