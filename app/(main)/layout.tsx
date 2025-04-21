
import React from 'react'
import { AppHeader } from './_components/Appheader'

type Props = {
    children: React.ReactNode
}

const dashboardLayout = ({
    children
}: Props) => {
  return (
    <div>
        <AppHeader/>
        <div className='p-10 mt-14 md:px-20 lg:px-56 2xl:px-72'>
        {children}
        </div>
    </div>
  )
}

export default dashboardLayout