

import React from 'react'

const Rating = () => {
  return (
   <div className="bg-white p-4 rounded shadow">
   <h2 className="text-lg font-semibold">Your Rating</h2>
   <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
   <div className="mt-4">
       {/* Placeholder for ratings chart */}
       <div className="flex justify-around">
           <div className="h-24 w-24 bg-blue-200 rounded-full flex items-center justify-center">
               <span>85% Hygiene</span>
           </div>
           <div className="h-24 w-24 bg-orange-200 rounded-full flex items-center justify-center">
               <span>85% Food Taste</span>
           </div>
           <div className="h-24 w-24 bg-green-200 rounded-full flex items-center justify-center">
               <span>92% Packaging</span>
           </div>
       </div>
   </div>
</div>
  )
}

export default Rating
