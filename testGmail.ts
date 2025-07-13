// src/testGmail.ts
import { gmail } from './auth';

async function test() {
  try {
    const res = await gmail.users.messages.list({
      userId: 'me',
      q: 'is:unread',
      maxResults: 5,
    });

    const messages = res.data.messages || [];
    console.log(`📬 Found ${messages.length} unread email(s).`);

    for (const msg of messages) {
      const detail = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id!,
      });

      const subjectHeader = detail.data.payload?.headers?.find((h: any) => h.name === 'Subject');
      const fromHeader = detail.data.payload?.headers?.find((h: any) => h.name === 'From');

      console.log(`🧾 Subject: ${subjectHeader?.value}`);
      console.log(`📨 From: ${fromHeader?.value}`);
      console.log(`🔹 Snippet: ${detail.data.snippet}`);
      console.log('---');
    }
  } catch (err) {
    console.error('❌ Gmail API error:', err);
  }
}

test();