import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const assemblyAi = new  AssemblyAI({apiKey: "5067999d94254128b3bc61c0d8a9aaf6"})

export async  function GET(req: Request){
   const token = await assemblyAi.realtime.createTemporaryToken({expires_in:3600}) 

   return NextResponse.json(token)
}