import { Mic, Play, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10">
      <div className="container px-4 py-16 text-center">
        <div className="mb-8 animate-float">
          <Mic className="mx-auto h-16 w-16 text-primary" />
        </div>
        <h1 className="mb-6 text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          ENJOY AI WITH OBUTO
        </h1>
        <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">
          Transform your speaking skills with personalized AI coaching. Get real-time feedback, exercises, and guidance to unlock your vocal potential.
        </p>
        <div className="flex gap-4 justify-center">
            <Link href={"/dashboard"}>
          <Button size="lg" className="gap-2">
            <Play className="h-4 w-4" /> Start Free Trial
          </Button>
            </Link>
          <Button size="lg" variant="outline" className="gap-2">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
