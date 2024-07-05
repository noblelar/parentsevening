'use client'
import React, { useEffect, useRef } from "react";

const data = {
   labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
   datasets: [{
     label: 'Looping tension',
     data: [65, 59, 80, 81, 26, 55, 40],
     fill: false,
     borderColor: 'rgb(75, 192, 192)',
   }]
 };
const config = {
   type: 'line',
   data: data,
   options: {
     animations: {
       tension: {
         duration: 1000,
         easing: 'linear',
         from: 1,
         to: 0,
         loop: true
       }
     },
     scales: {
       y: { // defining min and max so hiding the dataset does not change scale range
         min: 0,
         max: 100
       }
     }
   }
 };
 

const Revenue = () => {
 

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Revenue</h2>
      <p className="text-2xl font-bold text-green-600">IDR 7.852.000</p>
      <p className="text-sm text-gray-500">↑ 2.1% vs last week</p>
      <p className="text-gray-600 mt-2">Sales from 1-12 Dec, 2020</p>
      <div className="mt-4">
        {/* Placeholder for bar chart */}
        <div className="h-32 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default Revenue;
