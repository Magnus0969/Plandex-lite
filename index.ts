import { askOllama } from "./core";

async function main() {
  const userPrompt = process.argv.slice(2).join(" ") || "Build me a weather app";

  console.log("📌 User Prompt:", userPrompt);

  const plan = await askOllama("planner", userPrompt);
  console.log("\n📝 Plan:\n", plan?.message?.content);

  const arch = await askOllama("architect", plan?.message?.content || "");
  console.log("\n🏗 Architecture:\n", arch?.message?.content);

  const code = await askOllama("coder", arch?.message?.content || "");
  console.log("\n💻 Code:\n", code?.message?.content);

  const review = await askOllama("reviewer", code?.message?.content || "");
  console.log("\n🔍 Review:\n", review?.message?.content);

  const summary = await askOllama("summarizer", review?.message?.content || "");
  console.log("\n📌 Summary:\n", summary?.message?.content);

  console.log("\n✅ Done!");
}

main().catch(err => console.error("❌ Error:", err));
