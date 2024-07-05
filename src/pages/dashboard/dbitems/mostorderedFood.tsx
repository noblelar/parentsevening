

import React from 'react'

const MostOrderedFood = () => {
  return (
   <div className="bg-white p-4 rounded shadow">
   <h2 className="text-lg font-semibold">Most Ordered Food</h2>
   <div className="mt-4 space-y-2">
       <div className="flex justify-between items-center">
           <span>Fresh Salad Bowl</span>
           <span>IDR 45.000</span>
       </div>
       <div className="flex justify-between items-center">
           <span>Chicken Noodles</span>
           <span>IDR 75.000</span>
       </div>
       <div className="flex justify-between items-center">
           <span>Smoothie Fruits</span>
           <span>IDR 45.000</span>
       </div>
       <div className="flex justify-between items-center">
           <span>Hot Chicken Wings</span>
           <span>IDR 45.000</span>
       </div>
   </div>
</div>
  )
}

export default MostOrderedFood
