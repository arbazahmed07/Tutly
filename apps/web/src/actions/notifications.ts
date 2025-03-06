import { NotificationEvent, NotificationMedium } from "@prisma/client";
import { defineAction } from "astro:actions";
import webPush from "web-push";
import { z } from "zod";

import db from "@/lib/db";
import { ENV } from "@/lib/utils";

webPush.setVapidDetails(
  ENV("VAPID_SUBJECT"),
  ENV("PUBLIC_VAPID_PUBLIC_KEY"),
  ENV("VAPID_PRIVATE_KEY")
);

async function sendPushNotification(userId: string, message: string, notificationId: string) {
  const subscription = await db.pushSubscription.findFirst({
    where: { userId },
  });

  if (!subscription) return;

  try {
    await webPush.sendNotification(
      {
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.p256dh,
          auth: subscription.auth,
        },
      },
      JSON.stringify({
        message,
        id: notificationId,
        type: "NOTIFICATION",
      })
    );
  } catch (error) {
    console.error("Failed to send push notification:", error);
    if ((error as any).statusCode === 410) {
      await db.pushSubscription.delete({
        where: { endpoint: subscription.endpoint },
      });
    }
  }
}

export const getNotifications = defineAction({
  async handler(_, { locals }) {
    const userId = locals.user?.id!;
    const notifications = await db.notification.findMany({
      where: { intendedForId: userId },
      orderBy: { createdAt: "desc" },
    });
    return notifications;
  },
});

export const toggleNotificationAsReadStatus = defineAction({
  input: z.object({
    id: z.string(),
  }),
  async handler({ id }) {
    const notification = await db.notification.findUnique({
      where: { id },
    });

    const updatedNotification = await db.notification.update({
      where: { id },
      data: {
        readAt: notification?.readAt ? null : new Date(),
      },
    });
    return updatedNotification;
  },
});

export const markAllNotificationsAsRead = defineAction({
  async handler(_, { locals }) {
    const userId = locals.user?.id!;
    await db.notification.updateMany({
      where: {
        intendedForId: userId,
        readAt: null,
      },
      data: {
        readAt: new Date(),
      },
    });
  },
});

export const getNotificationConfig = defineAction({
  input: z.object({
    userId: z.string(),
  }),
  async handler({ userId }) {
    const subscription = await db.pushSubscription.findFirst({
      where: { userId },
    });
    return subscription;
  },
});

export const updateNotificationConfig = defineAction({
  input: z.object({
    userId: z.string(),
    config: z.object({
      endpoint: z.string(),
      p256dh: z.string(),
      auth: z.string(),
    }),
  }),
  async handler({ userId, config }) {
    const { endpoint, p256dh, auth } = config;

    // Delete existing subscription if endpoint is empty
    if (!endpoint) {
      await db.pushSubscription.deleteMany({
        where: { userId },
      });
      return null;
    }

    // Upsert subscription
    const subscription = await db.pushSubscription.upsert({
      where: {
        endpoint,
      },
      update: {
        p256dh,
        auth,
      },
      create: {
        userId,
        endpoint,
        p256dh,
        auth,
      },
    });

    return subscription;
  },
});

export const notifyUser = defineAction({
  input: z.object({
    userId: z.string(),
    message: z.string(),
  }),
  async handler({ userId, message }, { locals }) {
    const notification = await db.notification.create({
      data: {
        message,
        eventType: NotificationEvent.CUSTOM_MESSAGE,
        causedById: locals.user?.id!,
        intendedForId: userId,
        mediumSent: NotificationMedium.NOTIFICATION,
      },
    });

    await sendPushNotification(userId, message, notification.id);

    return notification;
  },
});
export const notifyBulkUsers = defineAction({
  input: z.object({
    courseId: z.string(),
    message: z.string(),
    customLink: z.string().optional(),
  }),
  async handler({ courseId, message, customLink }, { locals }) {
    const enrolledUsers = await db.enrolledUsers.findMany({
      where: {
        courseId,
        user: {
          role: {
            in: ["STUDENT", "MENTOR"],
          },
          organizationId: locals.user?.organizationId!,
        },
      },
      select: { user: { select: { id: true } } },
    });

    const notifications = await Promise.all(
      enrolledUsers.map((user) =>
        db.notification.create({
          data: {
            message,
            eventType: NotificationEvent.CUSTOM_MESSAGE,
            causedById: locals.user?.id!,
            intendedForId: user.user.id,
            mediumSent: NotificationMedium.NOTIFICATION,
            customLink: customLink || null,
          },
        })
      )
    );

    await Promise.all(
      enrolledUsers.map(async (enrolled, index) => {
        const notification = notifications[index];
        if (!notification) {
          throw new Error("Notification not found");
        }
        await sendPushNotification(enrolled.user.id, message, notification.id);
      })
    );

    return notifications;
  },
});
