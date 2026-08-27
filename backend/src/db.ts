import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('Warning: DATABASE_URL is not set in environment variables.');
}

// Enable SSL for Neon database connection by default
export const pool = new Pool({
  connectionString: databaseUrl,
  ssl: databaseUrl ? { rejectUnauthorized: false } : undefined,
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
