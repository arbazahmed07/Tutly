export function extractDeviceLabel(userAgent: string): string {
  if (!userAgent) return "Unknown Device";

  const ua = userAgent.toLowerCase();

  // Mobile devices
  if (ua.includes("iphone")) return "iPhone";
  if (ua.includes("ipad")) return "iPad";
  if (ua.includes("android")) {
    if (ua.includes("mobile")) return "Android Phone";
    return "Android Tablet";
  }

  // Desktop OS
  if (ua.includes("windows")) return "Windows PC";
  if (ua.includes("macintosh")) return "Mac";
  if (ua.includes("linux")) return "Linux";

  // Fallback
  return "Unknown Device";
}
