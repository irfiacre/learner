"use server";
// @ts-ignore
import pdfParse from "pdf-parse";
import mammoth from "mammoth";
import * as cheerio from "cheerio";


export async function parseAttachments(formData: FormData): Promise<string> {
  // Get all files from the FormData (client can send multiple)
  const files = formData.getAll("attachments") as File[];

  if (!files || files.length === 0) {
    throw new Error("No files were attached.");
  }

  let combinedText = "";

  for (const file of files) {
    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    try {
      if (file.type === "application/pdf") {
        const data = await pdfParse(buffer);
        extractedText = data.text;        
      } else if (
        file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } else if (file.type === "text/plain") {
        extractedText = buffer.toString("utf-8");
      } else {
        console.warn(`Skipping unsupported file type: ${file.name} (${file.type})`);
        continue; // Skip unsupported files
      }

      combinedText += `\n\n--- Content from ${file.name} ---\n${extractedText}`;

    } catch (err) {
      console.error(`Error parsing file ${file.name}:`, err);
      // Don't throw; just add an error message to the combined text
      combinedText += `\n\n--- Could not parse ${file.name} (Error) ---`;
    }
  }

  return combinedText.trim();
}

export async function fetchContentFromUrls(urls: string[]): Promise<string> {
  let combinedText = "";

  for (const url of urls) {
    if (!url || url.trim() === "") continue;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${url}. Status: ${response.status}`);
      }

      const html = await response.text();
      const $ = cheerio.load(html);

      // Remove script, style, and other non-content tags
      $("script, style, nav, footer, header, aside").remove();
      
      // Get text from the body, simple heuristic
      const text = $("body").text();

      // Clean up whitespace
      const extractedText = text.replace(/\s\s+/g, " ").trim();

      if (extractedText) {
        combinedText += `\n\n--- Content from ${url} ---\n${extractedText}`;
      }
    } catch (error) {
      console.error(`Error processing ${url}:`, (error as Error).message);
      combinedText += `\n\n--- Could not fetch content from ${url} ---`;
    }
  }

  return combinedText.trim();
}