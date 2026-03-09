import nodemailer from 'nodemailer';

// ─── Transporter ──────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ─── Send Password Reset Email ────────────────────────────────────────────────
export const sendPasswordResetEmail = async (
  to: string,
  resetUrl: string
): Promise<void> => {
  const mailOptions = {
    from: `"Portfolio API" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Password Reset Request',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #222;">Password Reset</h2>
        <p style="color: #555;">You requested a password reset for your Portfolio account. Click the button below to set a new password.</p>
        <p style="color: #555;">This link is valid for <strong>10 minutes</strong>.</p>
        <a href="${resetUrl}"
          style="display: inline-block; margin: 24px 0; padding: 12px 28px; background: #4f46e5; color: #fff; text-decoration: none; border-radius: 6px; font-weight: bold;">
          Reset My Password
        </a>
        <p style="color: #999; font-size: 13px;">If the button doesn't work, copy and paste this link into your browser:</p>
        <p style="color: #4f46e5; font-size: 13px; word-break: break-all;">${resetUrl}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
        <p style="color: #aaa; font-size: 12px;">If you did not request this, you can safely ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
};
