

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
  }: {
    coachingOption: string | undefined;
    conversation: any;
  }
) {
  try {
    // Find the coaching option. Throw an error if not found.
    const option = CoachingOptions.find(item => item.name === coachingOption);
    if (!option) {
      throw new Error(`Coaching option "${coachingOption}" not found.`);
    }

    const prompt = option.summeryPrompt;
    if (!prompt) {
      throw new Error("No summary prompt defined for the specified coaching option.");
    }

    // Attempt to call the OpenAI API.
    const completion = await openai.chat.completions.create({
      model: "thudm/glm-4-32b:free",
      messages: [
        { role: "assistant", content: prompt },
        ...conversation,
      ],
    });

    // Check if choices exist.
    if (!completion.choices || completion.choices.length === 0) {
      throw new Error("No choices returned from the OpenAI API.");
    }

    const message = completion.choices[0].message;
    if (!message) {
      throw new Error("No message returned in the API response.");
    }

    console.log(message);
    return message;
  } catch (error: any) {
    // Log the error for debugging purposes.
    console.error("Error in AIModelToGenerateFeedbackAndNotes:", error);
    // Optionally, you can customize the error that gets thrown or return a default value.
    throw error;
  }
}




