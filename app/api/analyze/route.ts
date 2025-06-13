import { NextRequest } from "next/server";
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "" 
});

export async function POST(req: NextRequest) {
  try {
    const { situation } = await req.json();

    const prompt = `
You are an expert in cross-cultural communication. Analyze the following situation using Erin Meyer's Culture Map.
Return a JSON object with:
- cultureMap: array of { dimension, value (0-5) }
- scenarios: 3 realistic ways the situation could evolve
- conflictStyles: 5 items with { style, recommendation }

Situation:
"""${situation}"""
`;

    const chat = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });

    const output = chat.choices[0].message.content || "{}";
    const json = JSON.parse(output);

    return new Response(JSON.stringify(json), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("API error:", err.message);
    return new Response(
      JSON.stringify({ error: "AI failed. Check your API key or response format." }),
      { status: 500 }
    );
  }
}
