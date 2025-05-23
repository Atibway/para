
import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

type Props = {}

export const AppHeader = (props: Props) => {
  return (
    <div className='p-3 shadow-sm flex justify-between items-center'>
        <Image
        src={'/logo.svg'}
        alt='logo'
        width={160}
        height={200}
        className='w-auto h-auto'
        />
        <UserButton/>
    </div>
  )
}