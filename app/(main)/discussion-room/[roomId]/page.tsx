"use client"
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { ConvertTextToSpeech, getToken } from '@/services/GlobalServices';
import { AIModel } from '@/services/GlobalServicesServer';
import { CoachingExpert } from '@/services/options';
import { UserButton } from '@stackframe/stack';
import { RealtimeTranscriber } from 'assemblyai';
import { useMutation, useQuery } from 'convex/react';
import { Loader2Icon } from 'lucide-react';

import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { ChatBox } from './_components/ChatBox';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'sonner';
import Link from 'next/link';
// import RecordRTC from 'recordrtc';
let RecordRTC: any;
if (typeof window !== "undefined") {
  import("recordrtc").then((module) => {
    RecordRTC = module.default;
  });
}

interface ExpertTypes {
  name: string;
  avatar: string;
  pro: boolean;
} 

const DiscussionRoom = () => {
    const {roomId} = useParams();
  const [expert, setExpert] = useState<ExpertTypes>()
  const [enableMic, setEnableMic] = useState(false)
  const realtimeTranscriber = useRef<RealtimeTranscriber | null>(null)
  const [loading, setLoading]= useState(false)
  const [enableFeedbackNotes, setEnableFeedbackNotes]= useState(false)
  const [audioUrl, setAudioUrl]= useState("")
  const [transcribe, setTranscribe] = useState<any>()
  const [conversation, setConversation] = useState<{ role: string; content: string }[]>([]);

  let texts:any = {}

  const UpdateConversation = useMutation(api.DiscussionRoom.updateConversation)

    const DiscussionRoomData = useQuery(api.DiscussionRoom.GetDiscussionRoom, {id: roomId as string})
    
    const recorder:any = useRef(null)
    let silenceTimeout:any

    useEffect(()=> {
      if(DiscussionRoomData){
        const Expert = CoachingExpert.find(item => item.name == DiscussionRoomData?.expertName)
        setExpert(Expert)
      }
    }, [DiscussionRoomData])


    const connectToServer = async() => {
      setEnableMic(true)
      setLoading(true)
      //Init Assembly AI
      realtimeTranscriber.current = new RealtimeTranscriber({
        token: await getToken(),
        sampleRate: 16_000
      })

      realtimeTranscriber.current.on('transcript', async(transcript)=> {
        
        let msg = '';

        if (transcript.message_type === 'FinalTranscript') {
          setConversation(prev => [
            ...prev,
            {
              role: 'user',
              content: transcript.text
            }
          ]);

          const aiResp = await AIModel({
            topic: DiscussionRoomData?.topic || "Default Topic",
            coachingOption: DiscussionRoomData?.coachingOptions || "Default Option",
            msg: transcript.text
          })
          setConversation(prev => [
            ...prev,
            {
              role: aiResp.role,
              content: aiResp.content || '' 
            }
          ])
 
    //       const url = await ConvertTextToSpeech(aiResp.content, DiscussionRoomData?.expertName)
    // setAudioUrl(url as string)
    //    console.log(audioUrl);
        }
        
texts[transcript.audio_start] = transcript.text;
const keys = Object.keys(texts);
keys.sort((a, b) => Number(a) - Number(b));

for (const key of keys) {
    if (texts[key]) {
        msg += `${texts[key]}`;
    }
}

setTranscribe(msg)
      })

      if (realtimeTranscriber.current) {
        await realtimeTranscriber.current.connect();
        setLoading(false)
        toast.success("connected...")
      }

      if (typeof window !== "undefined" && typeof navigator !== "undefined") {
          navigator.mediaDevices.getUserMedia({ audio: true })
          .then((stream) => {
              recorder.current = new RecordRTC(stream, {
                  type: 'audio',
                  mimeType: 'audio/webm;codecs=pcm',
                  recorderType: RecordRTC.StereoAudioRecorder,
                  timeSlice: 250,
                  desiredSampRate: 16000,
                  numberOfAudioChannels: 1,
                  bufferSize: 4096,
                  audioBitsPerSecond: 128000,
                  ondataavailable: async (blob:any) => {
                    if (!realtimeTranscriber.current) return;
                    // Reset the silence detection timer on audio input
                    clearTimeout(silenceTimeout);
                    const buffer = await blob.arrayBuffer();
                    // console.log(buffer);
                    realtimeTranscriber.current.sendAudio(buffer);
                    // Restart the silence detection timer
                    silenceTimeout = setTimeout(() => {
                        console.log('User stopped talking');
                        // Handle user stopped talking (e.g., send final transcript, etc.)
                    }, 2000);
                },
              });
              recorder.current.startRecording();
          })
          .catch((err)=> console.log(err))
      }
  };

  const disconnect = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (realtimeTranscriber.current) {
        await realtimeTranscriber.current.close();
      }
      
      if (recorder.current) {
        recorder.current.pauseRecording();
        recorder.current = null;
      }
      
      await UpdateConversation({
        id: DiscussionRoomData?._id as Id<"DiscussionRoom">,
        conversation: conversation,
      });
      toast.success("Disconnected")
      setEnableMic(false);
      setEnableFeedbackNotes(true)
    } catch (error) {
      console.error("Error during disconnect:", error);
      toast.error("Error during disconnect")
    } finally {
      // Ensure the loading state is always turned off
      setLoading(false);
    }
  };
  

  // useEffect(()=> {
  //  async function fetchData(){
  //   if(conversation[conversation.length -1].role == 'user'){
  //              //calling AI text Model to Get Response


  //   }
  //  }

  //  fetchData()
  // }, [conversation])

  return (
    <>
    <div className='-mt-16'>
      <Link href={"/dashboard"}>
      <Button variant={"link"}>
      Back To dashboard
      </Button>
      </Link>
    <h2 className='text-lg font-bold'>
      {DiscussionRoomData?.coachingOptions}
      </h2>
    <div className='mt-5 grid grid-cols-1 lg:grid-cols-3 gap-10'>
      <div className='lg:col-span-2'>
      <div className=' h-[60vh] bg-secondary border rounded-4xl flex flex-col items-center justify-center relative'>
        <Image 
        src={expert?.avatar || '/default-teacher-avatar.svg'}
         alt='Avatar'
          width={200} 
          height={200}
           className='h-[80px] w-[80px] rounded-full object-cover animate-pulse' />
        <h2 className='text-gray-500'>{expert?.name}</h2>
        {audioUrl && (
  <audio src={audioUrl}  autoPlay/>
 
)}

        <div className='p-5 bg-gray-200 px-10 rounded-lg absolute bottom-10 right-10'>
          <UserButton />
        </div>
      </div>
      <div className='mt-5 flex items-center justify-center'>
        {!enableMic ? (
           <Button 
           onClick={connectToServer}
           disabled={loading}
           
           >
            {loading && <Loader2Icon className='animate-spin'/>}
           Connect
         </Button>
        ): (
          <Button 
          onClick={disconnect} 
          variant={"destructive"}
          disabled={loading}
          >
              {loading && <Loader2Icon className='animate-spin'/>}
          Disconnect
        </Button>
        )}
       
      </div>
      </div>
      <div>
     <ChatBox
     conversation={conversation}
     enableFeedbackNotes={enableFeedbackNotes}
     coachingOption= {DiscussionRoomData?.coachingOptions}
     />
     
      </div>
    </div>

  </div>
    </>
  
  )
}

export default DiscussionRoom