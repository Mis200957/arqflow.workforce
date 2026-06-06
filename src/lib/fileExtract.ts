"use client";

export type ExtractedFile = {
  name: string;
  type: string;
  size: number;
  text: string;
};

export async function extractTextFromFile(file: File): Promise<ExtractedFile> {
  const lower = file.name.toLowerCase();
  let text = "";

  if (lower.endsWith(".pdf") || file.type === "application/pdf") {
    text = await extractPdfText(file);
  } else if (
    lower.endsWith(".docx") ||
    file.type ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    text = await extractDocxText(file);
  } else if (
    lower.endsWith(".txt") ||
    file.type === "text/plain" ||
    file.type.startsWith("text/")
  ) {
    text = await file.text();
  } else {
    throw new Error(`Unsupported file type: ${file.name}`);
  }

  return {
    name: file.name,
    type: file.type || guessType(file.name),
    size: file.size,
    text: text.trim(),
  };
}

function guessType(name: string): string {
  const l = name.toLowerCase();
  if (l.endsWith(".pdf")) return "application/pdf";
  if (l.endsWith(".docx"))
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  if (l.endsWith(".txt")) return "text/plain";
  return "application/octet-stream";
}

async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await import("pdfjs-dist");
  // Point the worker at the CDN copy of the matching version — avoids
  // fiddling with bundler-specific worker URL imports.
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: buffer }).promise;
  const parts: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const pageText = content.items
      .map((it) => ("str" in it ? (it as { str: string }).str : ""))
      .join(" ");
    parts.push(pageText);
  }
  return parts.join("\n\n");
}

async function extractDocxText(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser");
  const buffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer: buffer });
  return result.value;
}
