

import React from 'react'

const Orders = () => {
  return (
   <div className="bg-white p-4 rounded shadow mt-4 lg:mt-0">
            <h2 className="text-lg font-semibold">Order</h2>
            <p className="text-2xl font-bold text-red-600">2.568</p>
            <p className="text-sm text-gray-500">↓ 2.1% vs last week</p>
            <p className="text-gray-600 mt-2">Sales from 1-6 Dec, 2020</p>
            <div className="mt-4">
                {/* Placeholder for line chart */}
                <div className="h-32 bg-gray-200 rounded"></div>
            </div>
        </div>
  )
}

export default Orders
