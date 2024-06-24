import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const prompt =
      "Created a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For exmaple, Your output should be structured like this: 'what's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be? || What's a simple thing that makes you happy?. Ensure the questionair are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const result = await streamText({
      model: openai("gpt-3.5-turbo-instruct-0914"),
      prompt,
    });

    return result.toAIStreamResponse();
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), {
      headers: { "Content-Type": "application/json" },
      status: 500,
    });
  }
}
