"use server";

import OpenAI from "openai";
import { CoachingOptions } from "./options";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.AI_OPENROUTER,
});

export async function AIModel(
  {
    topic,
    coachingOption,
    msg,
  }: {
    topic: string;
    coachingOption: string;
    msg: string;
  }
) {
  // Look for the coaching option and build prompt with replaced topic
  const option = CoachingOptions.find((item) => item.name === coachingOption);
  if (!option) throw new Error(`Coaching option "${coachingOption}" not found.`);
  const prompt = option?.prompt.replace("{user_topic}", topic);

  const completion = await openai.chat.completions.create({
    model: "thudm/glm-4-32b:free",
    messages: [
      { role: "assistant", content: prompt },
      { role: "user", content: msg },
    ],
  });

  // Optionally, you can log the response here if needed:
  // console.log("AIModel response:", completion.choices[0].message);

  return completion.choices[0].message;
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
    // Validate the coaching option.
    const option = CoachingOptions.find((item) => item.name === coachingOption);
    if (!option) {
      throw new Error(`Coaching option "${coachingOption}" not found.`);
    }

    // IMPORTANT: Double-check that the property name is correct,
    // e.g. "summeryPrompt" versus "summaryPrompt".  
    const prompt = option.summeryPrompt;
    if (!prompt) {
      throw new Error("No summary prompt defined for the specified coaching option.");
    }

    // Log the prompt and conversation for debugging purposes.
    console.log("Feedback/Notes function -- prompt:", prompt);
    console.log("Feedback/Notes function -- conversation:", conversation);

    // Prepare the API payload.
    const payload = {
      model: "thudm/glm-4-32b:free",
      messages: [
        { role: "assistant", content: prompt },
        ...conversation, // Make sure conversation is an array of valid message objects!
      ],
    };

    // Make the API call.
    const completion = await openai.chat.completions.create(payload);

    // Log the full API response so you can inspect it.
    console.log("Feedback/Notes API full response:", completion);

    // Check if the API returned choices.
    if (!completion.choices || completion.choices.length === 0) {
      throw new Error(
        "No choices returned from the OpenAI API. Full response: " + JSON.stringify(completion)
      );
    }

    const message = completion.choices[0].message;
    if (!message) {
      throw new Error("No message returned in the API response.");
    }

    console.log("Feedback/Notes final message:", message);
    return message;
  } catch (error: any) {
    // Log detailed error info for further diagnosis.
    console.error("Error in AIModelToGenerateFeedbackAndNotes:", error);
    throw error;
  }
}
