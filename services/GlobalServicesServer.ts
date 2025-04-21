

"use server"

import OpenAI from "openai"

import { CoachingOptions } from "./options"

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.AI_OPENROUTER,
})

export async function AIModel(
        {
        topic, 
        coachingOption,
         msg 
    }:{
        topic:string
        coachingOption:string
        msg: string
    }
) {

        const option = CoachingOptions.find(item => item.name === coachingOption)
    const prompt = option?.prompt.replace('{user_topic}', topic)

  const completion = await openai.chat.completions.create({
    model: "thudm/glm-4-32b:free",
    messages: [
                { role: "assistant", content: prompt },
                { role: "user", content: msg },
              ],
  })

//   console.log(completion.choices[0].message)
  return completion.choices[0].message
}
export async function AIModelToGenerateFeedbackAndNotes(
        {
        coachingOption,
         conversation,
    }:{
        coachingOption: string | undefined
        conversation: any
    }
) {

        const option = CoachingOptions.find(item => item.name === coachingOption)
    const prompt = option?.summeryPrompt

  const completion = await openai.chat.completions.create({
    model: "thudm/glm-4-32b:free",
    messages: [
                { role: "assistant", content: prompt },
                ...conversation,
              ],
  })

//   console.log(completion.choices[0].message)
  return completion.choices[0].message
}



