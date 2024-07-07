

import React, { useState } from 'react'
import { Evening } from '@/utils/data_interface'
import { evenings } from '@/utils/datasamples'

const Evenings = () => {
   const [selectedEvening, setSelectedEvening] = useState<number | null>(null);

  return (
   <div className="overflow-x-auto">
   <table className="min-w-full bg-white border border-gray-200">
       <thead>
           <tr>
               <th className="px-4 py-2 border-b">ID</th>
               <th className="px-4 py-2 border-b">Year Group</th>
               <th className="px-4 py-2 border-b">Date</th>
               <th className="px-4 py-2 border-b">Term</th>
               <th className="px-4 py-2 border-b">Scheduled For</th>
               <th className="px-4 py-2 border-b">Start Time</th>
               <th className="px-4 py-2 border-b">End Time</th>
               <th className="px-4 py-2 border-b">Planned By</th>
           </tr>
       </thead>
       <tbody>
           {evenings.map((evening) => (
               <tr
                   key={evening.id}
                   className={`${
                       selectedEvening === evening.id ? 'bg-blue-100' : ''
                   } hover:bg-gray-100 cursor-pointer`}
                   onClick={() => setSelectedEvening(evening.id)}
               >
                   <td className="px-4 py-2 border-b">{evening.id}</td>
                   <td className="px-4 py-2 border-b">{evening.yearGroup}</td>
                   <td className="px-4 py-2 border-b">{evening.date}</td>
                   <td className="px-4 py-2 border-b">{evening.term}</td>
                   <td className="px-4 py-2 border-b">{evening.scheduledFor}</td>
                   <td className="px-4 py-2 border-b">{evening.startTime}</td>
                   <td className="px-4 py-2 border-b">{evening.endTime}</td>
                   <td className="px-4 py-2 border-b">{evening.plannedBy}</td>
               </tr>
           ))}
       </tbody>
   </table>
</div>
  )
}

export default Evenings
