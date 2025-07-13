// src/testFetch.ts
import { fetchUnreadEmails, ParsedEmail } from './fetchEmails';

fetchUnreadEmails().then((emails: ParsedEmail[]) => {
  console.log('📥 Unread Emails:');
  emails.forEach((email: ParsedEmail) => {
    console.log(`ID: ${email.id}`);
    console.log(`From: ${email.from}`);
    console.log(`Subject: ${email.subject}`);
    console.log(`Snippet: ${email.snippet}`);
    console.log(`Timestamp: ${new Date(email.timestamp).toLocaleString()}`);
    console.log('---');
  });
});