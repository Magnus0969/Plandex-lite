// core.ts
import fetch from "node-fetch";
import * as fs from "fs/promises";
import * as path from "path";

export type RoleName =
  | "planner"
  | "architect"
  | "coder"
  | "reviewer"
  | "summarizer";

<<<<<<< HEAD
export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaResponse {
  model: string;
  created_at?: string;
  message: OllamaMessage;
  done?: boolean;
}

const OLLAMA_URL = "<your_ollama_endpoint>"; 
const MODEL = "<your_ollama_model>"; // fixed model

// --- Updated Prompts with Markdown & Emojis ---
export const ROLE_PROMPTS: Record<RoleName, string> = {
  planner: `
You are **Plandex Planner** 🗂.
Format your response in Markdown.

# 🚀 Plan
- Break down the request into clear, **numbered steps**.
- Keep steps short, actionable, and easy to follow.
`,
  architect: `
You are **Plandex Architect** 🏗.
Format your response in Markdown.

# 🏗 Architecture
- Provide a concise high-level architecture.
- List **components, folders, main files, and tech choices**.
- Use code fences for folder structure (like \`\`\`text ... \`\`\`).
`,
  coder: `
You are **Plandex Coder** 💻.
Format your response in Markdown.

# 💻 Code
- Provide implementation code.
- Always wrap in triple backticks with **filename hints**:
  \`\`\`file:src/index.ts
  // code...
  \`\`\`
- If multiple files, output each separately.
`,
  reviewer: `
You are **Plandex Reviewer** 🔎.
Format your response in Markdown.

# 🔎 Review & Improvements
- Review the code for correctness, edge cases, and security issues.
- Suggest fixes or patches with **small code snippets**.
`,
  summarizer: `
You are **Plandex Summarizer** 📝.
Format your response in Markdown.

# 📌 Next Steps
- Provide a short (3–6 line) summary.
- Mention **testing, deployment, and monitoring** tasks.
`
};

async function postToOllama(messages: OllamaMessage[]): Promise<OllamaResponse | null> {
  try {
    const res = await fetch(OLLAMA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        messages,
        stream: false
      })
    });

    if (!res.ok) {
      console.error("❌ HTTP error:", res.status, res.statusText);
      return null;
    }

    const text = await res.text();
    try {
      const json = JSON.parse(text) as OllamaResponse;
      return json;
    } catch (err) {
      return { model: MODEL, message: { role: "assistant", content: text } };
    }
  } catch (err) {
    console.error("❌ postToOllama error:", err);
    return null;
  }
}
=======
const OLLAMA_URL = "<Your_ollama_endpoint>";
>>>>>>> a3aac3315423a38ac4228dc0eccedb8e33a11482

export async function askOllama(
  role: RoleName,
  userPrompt: string
): Promise<OllamaResponse | null> {
  const system = ROLE_PROMPTS[role];
  const messages: OllamaMessage[] = [
    { role: "system", content: system },
    { role: "user", content: userPrompt }
  ];
  return await postToOllama(messages);
}

// --- code extraction helpers (patched) ---
export function extractCodeBlocks(markdown: string): Array<{ filename: string; code: string }> {
  const blocks: Array<{ filename: string; code: string }> = [];

  // Match either: ```file:src/index.ts\n...``` or ```ts\n...```
  const re = /```(?:file:([^\n]+)|(\w+))?\n([\s\S]*?)```/g;
  let m;

  // language → extension map
  const extMap: Record<string, string> = {
    ts: "ts",
    js: "js",
    py: "py",
    json: "json",
    md: "md",
    txt: "txt",
    html: "html",
    css: "css",
    sh: "sh",
  };

  while ((m = re.exec(markdown)) !== null) {
    const filenameHint = (m[1] || "").trim();
    const langHint = (m[2] || "").trim().toLowerCase();
    const code = m[3].replace(/\r\n/g, "\n");

    let filename: string;
    if (filenameHint) {
      filename = filenameHint;
    } else if (langHint && extMap[langHint]) {
      filename = `snippet_${blocks.length + 1}.${extMap[langHint]}`;
    } else {
      filename = `snippet_${blocks.length + 1}.txt`;
    }

    blocks.push({ filename, code });
  }
  return blocks;
}

export async function saveCodeBlocks(
  blocks: Array<{ filename: string; code: string }>,
  projectName = "plandex-project",
  dryRun = false
): Promise<string[]> {
  const written: string[] = [];

  // base folder under CWD
  const baseDir = path.join(process.cwd(), projectName);
  if (dryRun) {
    console.log(`(dry-run) 📂 Would create baseDir: ${baseDir}`);
  } else {
    await fs.mkdir(baseDir, { recursive: true });
  }

  for (const blk of blocks) {
    // sanitize filename
    const safeFilename =
      blk.filename.replace(/^(\.*[\\/])+/, "").trim() ||
      `snippet_${written.length + 1}.ts`;

    // full output path inside baseDir
    const outPath = path.join(baseDir, safeFilename);

    // parent dir
    const dir = path.dirname(outPath);

    if (dryRun) {
      console.log(`(dry-run) 📂 Would ensure folder: ${dir}`);
      console.log(`(dry-run) 💾 Would save file: ${outPath}`);
    } else {
      // ensure nested dirs exist
      await fs.mkdir(dir, { recursive: true });

      // write file
      await fs.writeFile(outPath, blk.code, "utf8");
      console.log(`💾 Saved: ${outPath}`);
    }

    written.push(outPath);
  }
<<<<<<< HEAD

  return written;
}
=======
}
>>>>>>> a3aac3315423a38ac4228dc0eccedb8e33a11482
