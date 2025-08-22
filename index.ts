// index.ts
import { askOllama, extractCodeBlocks } from "./core";
import * as fs from "fs/promises";
import * as path from "path";
import { markdownToPDF } from "./markdown-to-pdf"; // adjust path if needed

async function main() {
  const userPrompt = process.argv.slice(2).join(" ");
  if (!userPrompt) {
    console.log('Usage: plandex "<what you want the project to do>"');
    process.exit(1);
  }

  console.log("📌 User Prompt:", userPrompt);

  // 1) Planner
  const planResp = await askOllama("planner", userPrompt);
  const planText = planResp?.message?.content ?? "No plan returned.";
  console.log("\n📝 Plan:\n", planText);

  // 2) Architect
  const archResp = await askOllama(
    "architect",
    `${planText}\n\nMake a folder/file layout and list the primary files needed.`
  );
  const archText = archResp?.message?.content ?? "No architecture returned.";
  console.log("\n🏗 Architecture:\n", archText);

  // 3) Coder
  const coderPrompt = `${archText}\n\nNow implement the code required. Produce runnable TypeScript/Node code. Use triple-backtick blocks with a filename hint as described.`;
  const coderResp = await askOllama("coder", coderPrompt);
  const coderText = coderResp?.message?.content ?? "No coder output.";
  console.log("\n💻 Coder output (raw):\n", coderText);

  // 🔹 3a) Extract code blocks
  const blocks = extractCodeBlocks(coderText);

  // helper: strip <think>...</think>
  const stripThinking = (text: string) =>
    text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();

  // helper: language → extension
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
  function detectExtension(block: string): string {
    const match = block.match(/^```(\w+)/); // e.g. ```ts
    if (match) {
      const lang = match[1].toLowerCase();
      return extMap[lang] || "txt";
    }
    return "txt";
  }

  // 🔹 save code blocks
  const projectName =
    userPrompt
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 30) || "plandex-project";

  await fs.mkdir(projectName, { recursive: true });

  if (blocks.length === 0) {
    console.warn("⚠️ No code blocks found in coder output.");
  } else {
    const savedFiles: string[] = [];
    for (let i = 0; i < blocks.length; i++) {
      const b = blocks[i];
      const ext = detectExtension(b.code);
      const filename = b.filename
        ? b.filename
        : `snippet_${i + 1}.${ext}`;
      const filePath = path.join(projectName, filename);

      // ✅ Ensure parent directories exist
      await fs.mkdir(path.dirname(filePath), { recursive: true });

      await fs.writeFile(filePath, stripThinking(b.code), "utf8");
      savedFiles.push(filePath);
    }
    console.log(`\n💾 Saved files under "./${projectName}":`);
    for (const f of savedFiles) console.log(" -", f);
  }

  // 4) Reviewer
  const reviewInput = `User request: ${userPrompt}\n\nArchitecture:\n${archText}\n\nCoder output:\n${coderText}`;
  const reviewResp = await askOllama("reviewer", reviewInput);
  const reviewText = reviewResp?.message?.content ?? "No review.";
  console.log("\n🔍 Reviewer:\n", reviewText);

  // 5) Summarizer
  const summaryResp = await askOllama(
    "summarizer",
    `${planText}\n\n${archText}\n\n${reviewText}`
  );
  const summaryText = summaryResp?.message?.content ?? "No summary.";
  console.log("\n📌 Summary & Next Steps:\n", summaryText);

  // 6) Generate Markdown report
  try {
    const reportMd = `# 🧱 Final Implementation

## 📌 User Prompt
${stripThinking(userPrompt)}

## 📝 Plan
${stripThinking(planText)}

## 🏗 Architecture
${stripThinking(archText)}

## 💻 Code (excerpt)
${blocks
  .map(
    (b, i) =>
      `\n### ${b.filename || `snippet_${i + 1}`}\n\`\`\`\n${stripThinking(
        b.code.slice(0, 200)
      )}...\n\`\`\``
  )
  .join("\n")}

## 🔍 Review
${stripThinking(reviewText)}

## 📌 Next Steps
${stripThinking(summaryText)}
`;

    const reportPath = `./${projectName}/REPORT.md`;
    await fs.writeFile(reportPath, reportMd, "utf8");
    console.log(`\n📝 Markdown report saved: ${reportPath}`);

    try {
      const pdfPath = await markdownToPDF(reportPath);
      console.log(`📄 PDF report saved: ${pdfPath}`);
    } catch (err) {
      console.error("❌ Failed to generate PDF:", err);
    }
  } catch (err) {
    console.error("❌ Failed to generate report:", err);
  }

  console.log("\n✅ Plandex-lite finished.");
}

main().catch((err) => {
  console.error("❌ Error in main:", err);
});