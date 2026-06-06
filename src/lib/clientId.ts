export function generateClientId(now: Date = new Date()): string {
  const pad = (n: number) => n.toString().padStart(2, "0");
  const dd = pad(now.getDate());
  const mm = pad(now.getMonth() + 1);
  const yy = pad(now.getFullYear() % 100);
  const ss = pad(now.getSeconds());
  return `CUST_${dd}${mm}${yy}${ss}`;
}
