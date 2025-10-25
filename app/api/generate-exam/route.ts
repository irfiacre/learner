import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";
import * as pdfParse from "pdf-parse";
import { spawn } from "child_process";
import { writeFile, unlink } from "fs/promises";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) return NextResponse.json({ error: "No file provided" }, { status: 400 });

  const buffer = Buffer.from(await file.arrayBuffer());
  const tmpPath = path.join("/tmp", file.name);
  await writeFile(tmpPath, buffer);

  // For simplicity, assume it's a PDF. You can add .docx/text handling.
  const text = await pdfParse(buffer).then((d: any) => d.text);

  // Call Python agent script
  const python = spawn("python3", ["./agent_runner.py", text]);
  
  let result = "";
  for await (const chunk of python.stdout) result += chunk;
  for await (const err of python.stderr) console.error(err.toString());

  await unlink(tmpPath);

  try {
    const quiz = JSON.parse(result);
    return NextResponse.json({ quiz });
  } catch (e) {
    return NextResponse.json({ error: "Failed to parse quiz" }, { status: 500 });
  }
}
