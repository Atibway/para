import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Hero from "./_components/hero";
import Features from "./_components/Features";
import HowItWorks from "./_components/howitworks";


export default function Home() {
  return(
    <div className="min-h-screen">
    <Hero />
    <Features />
    <HowItWorks />
  </div>
  )
  
}


{/* <div>
<Button>
  hello
</Button>
<UserButton/>
</div> */}