
import React from 'react'
import ReactMarkdowm from "react-markdown"
type Props = {
    summary: string
}

export const SummaryBox = ({
    summary
}: Props) => {
  return (
    <div className='h-[60vh] bg-secondary boarder rounded-2xl p-4  overflow-auto'>
        <ReactMarkdowm className='text-base/8'>
        {summary}
        </ReactMarkdowm>
    </div>
  )
}