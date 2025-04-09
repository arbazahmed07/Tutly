import { redirect } from "next/navigation";
import { db } from "@tutly/db";
import { NOTIFICATION_HREF_MAP } from "@/components/Notifications";
import type { causedObjects } from "@/components/Notifications";

export default async function NotificationRedirectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    redirect("/notifications");
  }

  const notification = await db.notification.findUnique({
    where: {
      id: id,
    },
  });

  if (!notification) {
    redirect("/notifications");
  }

  if (notification.customLink) {
    redirect(notification.customLink);
  }

  const getLinkFn = NOTIFICATION_HREF_MAP[notification.eventType];
  if (!getLinkFn) {
    redirect("/notifications");
  }

  const causedObj = notification.causedObjects
    ? (JSON.parse(JSON.stringify(notification.causedObjects)) as causedObjects)
    : {};
  const redirectUrl = getLinkFn(causedObj);

  await db.notification.update({
    where: { id },
    data: { readAt: new Date() },
  });

  redirect(redirectUrl);
} 