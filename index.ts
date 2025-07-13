// src/index.ts
import { fetchUnreadEmails } from './fetchEmails';
import { saveManyEmails } from './db';
import { applyRules } from './rulesEngine';

async function run() {
  const emails = await fetchUnreadEmails(10);
  await saveManyEmails(emails);
  await applyRules(emails);
}

run();