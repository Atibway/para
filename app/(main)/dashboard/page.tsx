
import React from 'react'
import { FeatureAssistants } from './_components/FeatureAssistants'
import { History } from './_components/History'
import {FeedBack} from './_components/FeedBack'

const Dashboard = () => {
  return (
    <div>
        <FeatureAssistants/>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10 mt-10'>
          <History/>
          <FeedBack/>
        </div>
    </div>
  )
}

export default Dashboard