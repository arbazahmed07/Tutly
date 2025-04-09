import { db } from "@/server/db";
import { NextResponse } from "next/server";

interface HealthMessage {
  status: string;
  message?: string;
  timestamp?: string;
  database?: string;
  services?: {
    database: string;
    auth: string;
    api: string;
  };
  error?: string;
}

export async function GET() {
  let status = 500;
  let message: HealthMessage = {
    status: "error",
    message: "Health check failed",
  };

  try {
    await db.$queryRaw`SELECT 1`;

    message = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      database: "connected",
      services: {
        database: "up",
        auth: "up",
        api: "up",
      },
    };
    status = 200;
  } catch (error) {
    message = {
      status: "error",
      timestamp: new Date().toISOString(),
      message: "Health check failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
    status = 500;
  }

  return NextResponse.json(message, { status });
}
