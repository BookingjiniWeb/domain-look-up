import nodemailer from "nodemailer";

// ✅ Configure transporter
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// ✅ Send a single mail
export async function sendGoalMail(to, link, name) {
  try {
    await transporter.sendMail({
      from: `"Goals App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Accept Your Goal",
      html: `
        <p>Hello <b>${name}</b>,</p>
        <p>Click the link below to accept your goal:</p>
        <p><a href="${link}">${link}</a></p>
      `,
    });
    console.log(`✅ Mail sent to ${to}`);
  } catch (error) {
    console.error(`❌ Failed to send mail to ${to}`, error);
  }
}

// ✅ Send bulk mails
export async function sendBulkGoalMails(recipients) {
  for (const user of recipients) {
    await sendGoalMail(user.email, user.link, user.name);
  }
}
