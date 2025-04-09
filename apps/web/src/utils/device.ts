export function extractDeviceLabel(userAgent: string): string {
  const ua = userAgent.toLowerCase();

  if (
    ua.includes("mobile") ||
    ua.includes("android") ||
    ua.includes("iphone")
  ) {
    return "Mobile Device";
  } else if (ua.includes("tablet") || ua.includes("ipad")) {
    return "Tablet";
  } else if (ua.includes("windows")) {
    return "Windows PC";
  } else if (ua.includes("macintosh") || ua.includes("mac os")) {
    return "Mac";
  } else if (ua.includes("linux")) {
    return "Linux PC";
  }

  return "Unknown Device";
}
