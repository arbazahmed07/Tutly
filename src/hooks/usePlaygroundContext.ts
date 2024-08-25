"use client";

import { useContext } from "react";
import { PlaygroundContext } from "@/app/(dashboard)/playgrounds/html-css-js/_components/PlaygroundContext";

export default function usePlaygroundContext() {
  const ide = useContext(PlaygroundContext);
  if (!ide) throw new Error("No editor found");
  return ide;
}
