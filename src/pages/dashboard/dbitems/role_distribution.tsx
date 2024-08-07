

import React from 'react'

const MostOrderedFood = () => {
  return (
   <div className="bg-white p-4 rounded shadow">
   <h2 className="text-lg font-semibold">User Roles Distribution</h2>
   <div className="mt-4 space-y-2">
       <div className="flex justify-between items-center">
           <span>Managers</span>
           <span>11</span>
       </div>
       <div className="flex justify-between items-center">
           <span>Teachers</span>
           <span>82</span>
       </div>
       <div className="flex justify-between items-center">
           <span>Parents</span>
           <span>477</span>
       </div>
       <div className="flex justify-between items-center">
           <span>Students</span>
           <span>611</span>
       </div>
   </div>
</div>
  )
}

export default MostOrderedFood
