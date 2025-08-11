
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // I browseren, bruk window.location
    return window.location.origin;
  }

  // På server – bruk VERCEL_URL eller fallback
  const vercelUrl = process.env.VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  // Lokal utvikling (npm run dev)
  return "http://localhost:3000";
}
