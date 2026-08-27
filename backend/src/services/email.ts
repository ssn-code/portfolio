import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface EmailParams {
  name: string;
  email: string;
  role?: string;
  message: string;
  createdAt: string;
}

export async function sendContactNotification(params: EmailParams): Promise<void> {
  const contactEmail = process.env.CONTACT_EMAIL;
  const resendFromEmail = process.env.RESEND_FROM_EMAIL;

  if (!resend) {
    throw new Error('Resend client is not initialized because RESEND_API_KEY is missing.');
  }

  if (!contactEmail || !resendFromEmail) {
    throw new Error('Missing CONTACT_EMAIL or RESEND_FROM_EMAIL environment variables.');
  }

  const htmlContent = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
      <h2 style="color: #0f172a; border-bottom: 2px solid #cbd5e1; padding-bottom: 10px; margin-top: 0;">New Portfolio Message</h2>
      <p style="color: #475569; font-size: 14px;">You have received a new contact submission from your portfolio website.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e293b; width: 120px;">Name:</td>
          <td style="padding: 8px 0; color: #334155;">${params.name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Email:</td>
          <td style="padding: 8px 0; color: #334155;">
            <a href="mailto:${params.email}" style="color: #2563eb; text-decoration: none;">${params.email}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Role/Affiliation:</td>
          <td style="padding: 8px 0; color: #334155;">${params.role || 'Not specified'}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e293b; vertical-align: top;">Message:</td>
          <td style="padding: 8px 0; color: #334155; white-space: pre-wrap; line-height: 1.5;">${params.message}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold; color: #1e293b;">Received:</td>
          <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-family: monospace;">${params.createdAt}</td>
        </tr>
      </table>
    </div>
  `;

  const { error } = await resend.emails.send({
    from: resendFromEmail,
    to: contactEmail,
    reply_to: params.email,
    subject: `New Portfolio Message — ${params.name}`,
    html: htmlContent,
    text: `
New message received from your portfolio.

Name:
${params.name}

Email:
${params.email}

Role / Affiliation:
${params.role || 'Not specified'}

Message:
${params.message}

Received:
${params.createdAt}
    `,
  });

  if (error) {
    throw error;
  }
}
