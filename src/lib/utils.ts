import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function env(key: string): string {
  if (import.meta.env.PROD && "process" in globalThis) {
    return process.env[key] as string;
  }
  return import.meta.env[key];
}

export function envOrThrow(key: string): string {
  const value = env(key);
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}