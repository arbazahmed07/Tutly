import { env } from "@/lib/utils";

const getSiteUrl = () => {
  return env("SITE") || "http://localhost:4321";
};

export { getSiteUrl };
