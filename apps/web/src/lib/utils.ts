import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function ENV(key: string): string {
  const value = import.meta.env[key] || process.env[key] || undefined;
  return value as string;
}