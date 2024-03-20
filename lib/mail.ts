import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: process.env.RESEND_EMAIL_SOURCE as string,
    to: email,
    subject: "2FA Code",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <h2 style="text-align: center; color: #007BFF;">This is Your 2FA Code</h2>
        <p style="text-align: center; font-size: 24px; color: #007BFF;">${token}</p>
        <p style="text-align: center; font-size: 14px; color: #666;">Please use this code to complete the 2FA process.</p>
      </div>
    `,
  });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetLink = `${domain}/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_EMAIL_SOURCE as string,
    to: email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <h2 style="text-align: center; color: #007BFF;">Reset your password</h2>
        <p style="text-align: center; font-size: 16px;">Click the button below to reset your password.</p>
        <div style="text-align: center;">
          <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Reset Password</a>
        </div>
        <p style="text-align: center; font-size: 14px; color: #666;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: process.env.RESEND_EMAIL_SOURCE as string,
    to: email,
    subject: "Confirm your email",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <h2 style="text-align: center; color: #007BFF;">Confirm your email</h2>
        <p style="text-align: center; font-size: 16px;">Click the button below to confirm your email address.</p>
        <div style="text-align: center;">
          <a href="${confirmLink}" style="display: inline-block; padding: 10px 20px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px;">Confirm Email</a>
        </div>
        <p style="text-align: center; font-size: 14px; color: #666;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  });
};
