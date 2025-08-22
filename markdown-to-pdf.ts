import { readFile } from "fs/promises";
import * as path from "path";
import puppeteer from "puppeteer";
import { marked } from "marked";

export async function markdownToPDF(
  markdownPath: string,
  outputPath?: string
): Promise<string> {
  const absMarkdownPath = path.resolve(markdownPath);
  const pdfPath = outputPath || absMarkdownPath.replace(/\.md$/, ".pdf");

  const mdContent = await readFile(absMarkdownPath, "utf8");
  const htmlContent = marked(mdContent);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          pre { background: #f4f4f4; padding: 10px; border-radius: 6px; }
          code { font-family: monospace; color: #c7254e; }
          h1,h2,h3 { color: #333; }
        </style>
      </head>
      <body>${htmlContent}</body>
    </html>
  `);
  await page.pdf({ path: pdfPath, format: "A4" });
  await browser.close();

  console.log(`📄 PDF saved at: ${pdfPath}`);
  return pdfPath;
}