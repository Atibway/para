"use client"
import { UserContext } from '@/app/_context/UserContext';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { CoachingOptions } from '@/services/options';
import { useConvex } from 'convex/react';
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import moment from "moment"
import Link from 'next/link';

interface ResultProps {
  _id: Id<"DiscussionRoom">;
  _creationTime: number;
  conversation?: any;
  summary?: any;
  userId?: Id<"users"> | undefined;
  coachingOptions: string;
  topic: string;
  expertName: string;
}

export const History = () => {
const [discussionRoomList, setDiscussionRoomList] = useState<ResultProps[]>()
  const convex = useConvex();
const { userData } = useContext(UserContext);

useEffect(() => {
  userData && GetDiscussionRooms();
}, [userData]);

const GetDiscussionRooms = async () => {
  const result = await convex.query(api.DiscussionRoom.GetAllDiscussionRoom, {
    userId: userData?._id as  Id<"users">
  });
  setDiscussionRoomList(result)
};

const GetAbstractImages = (option:any) => {
  const coachingOption = CoachingOptions.find((item) => item.name == option);
  return coachingOption?.abstract ?? "/ab1.png"
}



  return (
    <div>
        <h2 className='font-bold text-xl'>Your Previous Lectures</h2>
        {discussionRoomList?.length ==0 &&  <h2 className='text-gray-400'>You do not have any previous lectures</h2>}
      
        <div className='mt-5'>
  {discussionRoomList?.map((item, index) => 
    (item.coachingOptions === 'Topic Base Lecture' || item.coachingOptions === 'Learn Language'  || item.coachingOptions === 'Meditation') && (
      <div key={index} className='border-b-[1px] pb-3 mb-4 group flex justify-between items-center cursor-pointer'>
        <div className='flex gap-7 items-center'>
       <Image
   src={GetAbstractImages(item.coachingOptions) || ''}
   alt='abstract'
   width={50}
   height={50}
   className='rounded-full h-[50px] w-[50px]'
       />
        <div>
          <h2 className='font-bold'>{item.topic}</h2>
          <h2 className='text-gray-700'>{item.coachingOptions}</h2>
          <h2 className='text-gray-400 text-xs'>{
         moment(item._creationTime).fromNow()}</h2>
        </div>
        </div>
        
        <Link
        href={'/view-summary/'+item._id}
        >
        <Button className='cursor-pointer' variant={"outline"}>
          View Notes
        </Button>
        </Link>
      </div>
    )
  )}
</div>


    </div>
  )
}
