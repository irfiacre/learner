"use server";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent } from "langchain";
import * as z from "zod";

const API_KEY = process.env.NEXT_GOOGLE_API_KEY;

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: API_KEY,
});

const QuestionsSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  answer: z.string(),
});

const ModelResponse = z.object({result: z.array(QuestionsSchema) });

export const handleGetAgentOutput = async (assessmentPrompt: string) => {
  const agent = createAgent({
    model,
    tools: [],
    responseFormat: ModelResponse,
  });

  const result = await agent.invoke({
    messages: [
      {
        role: "user",
        content: assessmentPrompt,
      },
    ],
  });

  return result.structuredResponse;
};
