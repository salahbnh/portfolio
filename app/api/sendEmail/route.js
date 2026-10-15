// app/api/sendEmail/route.js
import nodemailer from 'nodemailer';

const LIMITS = { name: 100, email: 254, message: 5000 };
// Pragmatic format check (no spaces, one "@", a dot in the domain).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function json(body, status) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

function validate({ name, email, message }) {
  if (!name || !email || !message) return 'Name, email and message are required.';
  if (name.length > LIMITS.name) return `Name must be ${LIMITS.name} characters or fewer.`;
  if (email.length > LIMITS.email || !EMAIL_RE.test(email)) return 'Please enter a valid email address.';
  if (message.length > LIMITS.message) return `Message must be ${LIMITS.message} characters or fewer.`;
  // Block header injection through the name (used in the subject line).
  if (/[\r\n]/.test(name)) return 'Name must be a single line.';
  return null;
}

export async function POST(request) {
  // Parse the incoming form data
  let formData;
  try {
    formData = await request.formData();
  } catch {
    return json({ error: 'Invalid form submission.' }, 400);
  }

  const field = (key) => {
    const value = formData.get(key);
    return typeof value === 'string' ? value.trim() : '';
  };
  const name = field('name');
  const email = field('email');
  const message = field('message');

  const validationError = validate({ name, email, message });
  if (validationError) {
    return json({ error: validationError }, 400);
  }

  // Create the transporter using explicit SMTP configuration for Gmail
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,       // Use port 465 for SSL
    secure: true,    // Use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    ...(process.env.NODE_ENV === 'development' && {
        tls: {
          rejectUnauthorized: false,
        },
    }),
  });

  const mailOptions = {
    // Gmail only sends as the authenticated account; the visitor goes in replyTo.
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.YOUR_EMAIL,
    subject: `New message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return json({ success: true }, 200);
  } catch (error) {
    console.error("Error sending email:", error);
    return json({ error: 'Failed to send message. Please try again later.' }, 500);
  }
}
