import { gmail } from './auth';

export interface ParsedEmail {
  id: string;
  from: string;
  subject: string;
  snippet: string;
  timestamp: number;
}

export async function fetchUnreadEmails(limit = 50): Promise<ParsedEmail[]> {
  const res = await gmail.users.messages.list({
    userId: 'me',
    q: '',
    maxResults: limit,
  });

  const messages = res.data.messages || [];

  const parsedEmails: ParsedEmail[] = [];

  for (const msg of messages) {
    const detail = await gmail.users.messages.get({
      userId: 'me',
      id: msg.id!,
    });

    const headers = detail.data.payload?.headers || [];

    const from = headers.find((h: any) => h.name === 'From')?.value || 'Unknown';
    const subject = headers.find((h: any) => h.name === 'Subject')?.value || '(No Subject)';
    const snippet = detail.data.snippet || '';
    const timestamp = Number(detail.data.internalDate) || Date.now();

    parsedEmails.push({
      id: detail.data.id!,
      from,
      subject,
      snippet,
      timestamp,
    });
  }

  return parsedEmails;
}