// src/db.ts
import { ParsedEmail } from './fetchEmails';
import pkg from 'pg';

const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'gmaildb',
  password: 'ksp5779', // 🔒 replace with your real password
  port: 5432,
});

export async function saveManyEmails(emails: ParsedEmail[]) {
  const client = await pool.connect();

  try {
    for (const email of emails) {
      await client.query(
        `INSERT INTO emails (id, from_address, subject, snippet, timestamp)
         VALUES ($1, $2, $3, $4, to_timestamp($5 / 1000.0))
         ON CONFLICT (id) DO NOTHING`,
        [email.id, email.from, email.subject, email.snippet, email.timestamp]
      );
    }
  } finally {
    client.release();
  }
}