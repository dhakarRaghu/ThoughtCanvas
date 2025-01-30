// src/app/api/completion/route.ts
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  console.log("prompt", prompt);

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const promptfinal = `
  You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences.
  The traits of AI include expert knowledge, helpfulness, cleverness, and articulateness.
  AI is a well-behaved and well-mannered individual.
  AI is always friendly, kind, and inspiring, and he is eager to provide vivid and thoughtful responses to the user.

  I am writing a piece of text in a notion text editor app.
  Help me complete my train of thought here: ##${prompt}##
  keep the tone of the text consistent with the rest of the text.
  keep the response short and sweet.
`
  const result = await model.generateContent(promptfinal);

  const completion = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

  console.log("response", JSON.stringify({ completion }));
  return new NextResponse(JSON.stringify({ completion: result.response.text }));
}
