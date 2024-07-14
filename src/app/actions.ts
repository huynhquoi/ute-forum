"use server";

import { google } from "@ai-sdk/google";
import { streamText } from "ai";
import { createStreamableValue } from "ai/rsc";

export interface MessageAI {
  role: "user" | "assistant";
  content: string;
}

export async function continueConversation(history: MessageAI[]) {
  "use server";

  const stream = createStreamableValue();
  const model = google("models/gemini-1.5-flash-latest");

  (async () => {
    const { textStream } = await streamText({
      model: model,
      messages: history,
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })().then(() => {});

  return {
    messagesAI: history,
    newMessageAI: stream.value,
  };
}