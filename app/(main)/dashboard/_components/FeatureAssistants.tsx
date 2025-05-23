"use client"

import { BlurFade } from "@/components/magicui/blur-fade"
import { Button } from "@/components/ui/button"
import { CoachingOptions } from "@/services/options"
import { useUser } from "@stackframe/stack"
import Image from "next/image"
import { UserInputDialog } from "./UserInputDialog"

type Props = {}

 export const FeatureAssistants = (props: Props) => {
    const user = useUser()
  return (
    <div>
        <div className="flex justify-between items-center">
        <div>
        <h2 className='font-medium text-gray-500'>My Workspace</h2>
        <h2 className="text-3xl font-bold">Welcome back, {user?.displayName}</h2>
        </div>
        <Button>Profile</Button>


        </div>
        <div className='grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-5 gap-10 mt-5'>
  {CoachingOptions.map((option, index) => (
    <BlurFade  key={option.icon} delay={0.25 + index * 0.05} inView>
        <div className='p-3 bg-secondary rounded-3xl flex flex-col justify-center items-center'>
      <UserInputDialog coachingOption={option}>
        <div className='flex flex-col justify-center cursor-pointer items-center'>
      <Image
       src={option.icon}
        alt={option.name} 
        width={150} 
        height={150} 
        className='h-[70px] w-[70px] hover:rotate-12  transition-all' />
      <h2 className='mt-2'>{option.name}</h2>
    </div>
      </UserInputDialog>
        </div>
      </BlurFade>
  ))}
  </div>
    </div>
  )
}