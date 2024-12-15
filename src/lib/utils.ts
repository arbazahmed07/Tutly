import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function env(key: string): string {
  const value = import.meta.env[key] || process.env[key] || undefined;
  return value as string;
}

export function envOrThrow(key: string): string {
  const value = env(key);
  // if (!value) {
  //   throw new Error(`Missing environment variable: ${key}`);
  // }
  return value;
}