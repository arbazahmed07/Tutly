import { sendEmail } from "@/actions/resend";
import { type NextRequest } from "next/server";

interface SendEmailType {
  email: string;
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as SendEmailType;
  try {
    const email = body.email;

    const ip =
      req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");

    const device = req.headers.get("user-agent");

    const { data, error } = await sendEmail({ email, ip, device });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
