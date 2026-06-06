declare module "mammoth/mammoth.browser" {
  type Input = { arrayBuffer: ArrayBuffer } | { buffer: ArrayBuffer };
  export function extractRawText(input: Input): Promise<{
    value: string;
    messages: { type: string; message: string }[];
  }>;
  export function convertToHtml(input: Input): Promise<{
    value: string;
    messages: { type: string; message: string }[];
  }>;
}
