import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  await client.connect();
  const res = await client.query('SELECT * FROM emails ORDER BY timestamp DESC LIMIT 5');
  console.log(res.rows);
  await client.end();
})();