import fetch from "node-fetch";
import type { OllamaResponse } from "./types";

// Optional: centralize role prompts
const roles = {
  planner: "You are a Planner. Break down user requests into clear, actionable steps.",
  coder: "You are a Coder. Write clean, working code that solves the described tasks.",
  summarizer: "You are a Summarizer. Condense outputs into concise, useful notes.",
  architect: "You are an Architect. Propose high-level design choices and trade-offs.",
  reviewer: "You are a Reviewer. Check outputs for errors, correctness, and clarity."
} as const;

const OLLAMA_URL = "<Your_ollama_endpoint>";

export async function askOllama(
  role: keyof typeof roles,
  prompt: string
): Promise<OllamaResponse | null> {
  const res = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "qwen3:4b",
      messages: [
        { role: "system", content: roles[role] },
        { role: "user", content: prompt }
      ],
      stream: false
    })
  });

  if (!res.ok) {
    console.error("❌ HTTP error:", res.status, res.statusText);
    return null;
  }

  const text = await res.text();
  try {
    return JSON.parse(text) as OllamaResponse;
  } catch (err) {
    console.error("❌ Failed to parse JSON:", err);
    return null;
  }
}
