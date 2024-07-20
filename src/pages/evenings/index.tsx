

import DashboardNav from '@/components/ui/dashboardnav'
import React from 'react'
import EveningTable from './eveningstable'
import { evenings } from '@/utils/datasamples'

const Evenings = () => {
  return (
   <div className=" h-[calc(100vh-77.797px)] w-[100%] overflow-y-scroll space-y-8">
   <DashboardNav />
   <EveningTable evenings={evenings}  />
 </div>
  )
}

export default Evenings
