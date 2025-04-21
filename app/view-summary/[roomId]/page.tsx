"use client"

import { ChatBox } from "@/app/(main)/discussion-room/[roomId]/_components/ChatBox";
import { api } from "@/convex/_generated/api"
import { CoachingOptions } from "@/services/options";
import { useMutation, useQuery } from "convex/react"
import moment from "moment";
import Image from "next/image";
import { useParams } from "next/navigation";
import { SummaryBox } from "./_components/summaryBox";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ViewSummaryPage = () => {
     const {roomId} = useParams();
      const UpdateConversation = useMutation(api.DiscussionRoom.updateConversation)
    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {id: roomId as string})

    const GetAbstractImages = (option:any) => {
      const coachingOption = CoachingOptions.find((item) => item.name == option);
      return coachingOption?.abstract ?? "/ab1.png"
    }

  return (
    <div className="bg-amber-50">
<Link href={"/dashboard"}>
      <Button variant={"link"}>
      Back To dashboard
      </Button>
      </Link>
    <div className='p-10 md:px-20 lg:px-56 2xl:px-72 '>
      <div className="flex justify-between items-end">
      <div className="flex gap-7 items-center">
       <Image
         src={GetAbstractImages(DiscussionRoomData?.coachingOptions) || ''}
         alt='abstract'
         width={50}
         height={50}
         className='rounded-full h-[50px] w-[50px]'
             />

             <div>
                       <h2 className='font-bold text-2xl'>{DiscussionRoomData?.topic}</h2>
                       <h2 className='text-gray-700'>{DiscussionRoomData?.coachingOptions}</h2>
                     
                     </div>

      </div>
      <h2 className='text-gray-400'>{
        moment(DiscussionRoomData?._creationTime).fromNow()}
        </h2>
      
</div>

        <div className='grid grid-cols-1 lg:grid-cols-5 gap-5 mt-5'>
  <div className='col-span-3'>
    <h2 className="text-lg font-bold mb-6">Summery of your Conversation</h2>
    <SummaryBox
  summary={DiscussionRoomData?.summary}
    />
  </div>
  <div className="col-span-2">
  <h2 className="text-lg font-bold mb-6">Your Conversation</h2>
    {DiscussionRoomData?.conversation && <ChatBox 
    summaryPage={true}
    conversation={DiscussionRoomData.conversation} coachingOption={DiscussionRoomData?.coachingOptions} enableFeedbackNotes={false} />}
  </div>
</div>

    </div>
    </div>

  )
}

export default ViewSummaryPage