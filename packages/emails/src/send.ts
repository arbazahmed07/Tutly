import { Resend } from "resend";

import { reactInvitationEmail } from "./templates/invitation";
import { reactResetPasswordEmail } from "./templates/reset-password";
import { reactVerificationEmail } from "./templates/verify-email";

const resendInstance = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async ({
  email,
  username,
  url,
}: {
  email: string;
  username: string;
  url: string;
}) => {
  return resendInstance.emails.send({
    from: "Tutly <no-reply@mail.tutly.in>",
    to: [email],
    subject: "Verify your email address",
    react: reactVerificationEmail({ username, url }),
  });
};

export const sendPasswordResetEmail = async ({
  email,
  username,
  resetLink,
}: {
  email: string;
  username: string;
  resetLink: string;
}) => {
  return resendInstance.emails.send({
    from: "Tutly <no-reply@mail.tutly.in>",
    to: [email],
    subject: "Reset your password",
    react: reactResetPasswordEmail({ username, resetLink }),
  });
};

export const sendInvitationEmail = async ({
  email,
  username,
  invitedByUsername,
  invitedByEmail,
  teamName,
  teamImage,
  inviteLink,
}: {
  email: string;
  username?: string;
  invitedByUsername?: string;
  invitedByEmail?: string;
  teamName?: string;
  teamImage?: string;
  inviteLink?: string;
}) => {
  return resendInstance.emails.send({
    from: "Tutly <no-reply@mail.tutly.in>",
    to: [email],
    subject: "Join a team on Tutly",
    react: reactInvitationEmail({
      username,
      invitedByUsername,
      invitedByEmail,
      teamName,
      teamImage,
      inviteLink,
    }),
  });
};

export const sendCustomEmail = async ({
  email,
  subject,
  component,
  props,
}: {
  email: string;
  subject: string;
  component: (props: any) => JSX.Element;
  props: Record<string, any>;
}) => {
  return resendInstance.emails.send({
    from: "Tutly <no-reply@mail.tutly.in>",
    to: [email],
    subject,
    react: component(props),
  });
};
