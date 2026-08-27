import { Router, Request, Response, NextFunction } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';
import { query } from '../db.js';
import { sendContactNotification } from '../services/email.js';

const router = Router();

// Rate limiting: max 1 request per IP every 5 minutes
const contactRateLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 1,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages transmitted. Please wait 5 minutes before trying again.',
  },
  statusCode: 429,
});

// Zod schema for input validation
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .max(80, { message: 'Name cannot exceed 80 characters.' }),
  email: z
    .string()
    .trim()
    .email({ message: 'Please provide a valid email address.' })
    .max(320, { message: 'Email cannot exceed 320 characters.' }),
  role: z
    .string()
    .trim()
    .max(120, { message: 'Role/Affiliation cannot exceed 120 characters.' })
    .optional()
    .or(z.literal('')),
  message: z
    .string()
    .trim()
    .min(10, { message: 'Message must be at least 10 characters long.' })
    .max(1500, { message: 'Message cannot exceed 1500 characters.' }),
});

router.post('/contact', contactRateLimiter, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Validation
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      const errorMsg = parsed.error.errors.map((e) => e.message).join(' ');
      return res.status(400).json({
        success: false,
        message: errorMsg,
      });
    }

    const { name, email, role, message } = parsed.data;

    // 2. Database Insertion (Neon PostgreSQL)
    const dbQuery = `
      INSERT INTO contact_messages (name, email, role, message)
      VALUES ($1, $2, $3, $4)
      RETURNING id, created_at;
    `;
    const dbParams = [name, email, role || null, message];
    
    let dbResult;
    try {
      dbResult = await query(dbQuery, dbParams);
    } catch (dbError) {
      console.error('Database insertion error:', dbError);
      return res.status(500).json({
        success: false,
        message: 'Unable to transmit your message. Please try again.',
      });
    }

    const messageId = dbResult.rows[0].id;
    const createdAt = dbResult.rows[0].created_at;

    // 3. Resend Dispatch (Safe error handling - do not fail transaction if email fails)
    try {
      const formattedDate = new Date(createdAt).toLocaleString('en-US', {
        timeZone: 'UTC',
        dateStyle: 'medium',
        timeStyle: 'medium',
      }) + ' UTC';

      await sendContactNotification({
        name,
        email,
        role: role || undefined,
        message,
        createdAt: formattedDate,
      });

      // Update status in DB to "notified" or log success
      await query('UPDATE contact_messages SET status = $1 WHERE id = $2', ['notified', messageId]);
    } catch (emailError) {
      console.error(`Email delivery failed for message ID ${messageId}:`, emailError);
      // We do NOT return a failure response or throw an error, because the message is safely stored in DB.
    }

    // 4. Return success response
    return res.status(200).json({
      success: true,
      message: 'Message received successfully.',
    });
  } catch (err) {
    next(err);
  }
});

export default router;
