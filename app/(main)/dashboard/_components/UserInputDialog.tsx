 "use client"

import { UserContext } from "@/app/_context/UserContext";
 import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { CoachingExpert } from "@/services/options";
import { useMutation } from "convex/react";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
interface options {
    name: string;
    icon: string;
    prompt: string;
    summeryPrompt: string;
    abstract: string;
}

type props = {
    children: React.ReactNode;
    coachingOption: options
}
export function UserInputDialog({
coachingOption,
children
}:props) {
  const [selectedExpert, setSelectedExpert] = useState<string>("")
  const [topic, setTopic] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  const router = useRouter()

  const {userData} = useContext(UserContext)

  const createDiscussionRoom = useMutation(api.DiscussionRoom.CreateNewRoom)

  const onClickNext=async()=>{
    setLoading(true)
const result = await createDiscussionRoom({
  topic: topic,
  coachingOptions: coachingOption?.name,
  expertName: selectedExpert,
  userId: userData?._id as Id<"users">
})

setLoading(false)
setOpenDialog(false)

router.push(`/discussion-room/${result}`)
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{coachingOption.name}</DialogTitle>
          <DialogDescription asChild>
            <div className="mt-3">
              <h2>Enter a topic to master your skills in <span className="font-bold text-black">{coachingOption.name}</span> </h2>
             
        </div>
          </DialogDescription>

        </DialogHeader>
       <div>
       <Textarea
      className="mt-2"
       placeholder="Enter your topic here..."
       onChange={(e)=> setTopic(e.target.value)}
       />
        <h2 className="text-black mt-5">Select your coaching expert </h2>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-6 mt-3">
          {CoachingExpert.map((expert, index)=> (
            <div 
            key={index}
             onClick={()=> setSelectedExpert(expert.name)}
             >
              <Image
              src={expert.avatar}
              alt={expert.name}
              width={100}
              height={100}
              className={cn(
                "p-1 rounded-2xl h-[80px] w-[80px] object-cover hover:scale-105 transition-all cursor-pointer",
                selectedExpert == expert.name && "border-2 border-primary"
               )}
              />
              <h2 className="text-center">{expert.name}</h2>
            </div>
          ))}
        </div>
       </div>
        <DialogFooter className="flex gap-5 justify-end mt-5">
          <DialogClose asChild>
          <Button variant={"ghost"}>Cancel</Button>
          </DialogClose>
          <Button 
          disabled={(!topic || !selectedExpert || loading)}
          onClick={onClickNext}
          >
            {loading && <LoaderCircle className="animate-spin"/>}
            Next
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
