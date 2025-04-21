"use client"

import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { AIModelToGenerateFeedbackAndNotes } from '@/services/GlobalServicesServer';
import { useMutation } from 'convex/react';
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useState } from 'react'
import { toast } from 'sonner';

type Props = {
  conversation: {
    role: string;
    content: string;
}[]
enableFeedbackNotes: boolean
coachingOption: string | undefined
summaryPage?: boolean
}

export const ChatBox = ({
  conversation,
  enableFeedbackNotes,
  coachingOption,
  summaryPage
}: Props) => {
const {roomId} = useParams();
const [loading, setLoading]= useState(false)

  const updateSummary = useMutation(api.DiscussionRoom.updateSummary)

  const GenerateFeedbackNotes = async () => {
    try {
      setLoading(true);
      toast.success("starting generating...")
      console.log(conversation);
      
      // Call AI to generate feedback and notes
      const result = await AIModelToGenerateFeedbackAndNotes({
        coachingOption,
        conversation,
      });
      console.log(!result.content);
  
      if (!result?.content) {
        toast.error("No content returned from AI model.")
        throw new Error("No content returned from AI model.");
      }else {
        toast.success("content returned from AI model.")
      }
  
      // Update the summary in the backend
    const summary =  await updateSummary({
        id: roomId as Id<"DiscussionRoom">,
        summary: result.content,
      });
  
      console.log(summary);
      toast.success("Feedback/Notes Saved!")
    setLoading(false);

    } catch (error) {
      console.error("Failed to generate feedback notes:", error);
      toast.error("Failed to generate feedback notess")
      setLoading(false);
    } 
  };
  

  return (
    <div>
    <div className='h-[60vh] bg-secondary boarder rounded-2xl flex flex-col relative p-4 overflow-auto'>
      
        {conversation.map((message, index) => (
          <div className={cn("flex",
          message.role == 'user' && "justify-end"
          )}
           key={index}>
{message.role == "assistant"? 
<h2 className='p-1 px-2 bg-primary mt-2 text-white inline-block rounded-md'>
{message.content}
</h2>
:
<h2 className='p-1 px-2 bg-gray-200 mt-2 inline-block rounded-md justify-end'>
{message.content}
</h2>
}
     
          </div>
        ))}
  
      </div>
      
      {summaryPage && (
  <Button onClick={GenerateFeedbackNotes} className='mt-7 w-full'>
  {loading && <LoaderCircle className='animate-spin' />}
  Re-Generate Feedback/Notes
</Button>
      )}

    {!summaryPage && (
      !enableFeedbackNotes ? (
        <h2 className='mt-4 text-gray-400'>At the end of your conversation we will automatically generate feedback notes from your conversation</h2>
      ) : (
        <Button onClick={GenerateFeedbackNotes} className='mt-7 w-full'>
          {loading && <LoaderCircle className='animate-spin' />}
          Generate Feedback/Notes
        </Button>
      )
    )}
    </div>
  )
}