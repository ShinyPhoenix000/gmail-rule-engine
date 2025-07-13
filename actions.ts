// src/actions.ts
import { gmail } from './auth';

export async function markEmailAsRead(emailId: string) {
  await gmail.users.messages.modify({
    userId: 'me',
    id: emailId,
    requestBody: {
      removeLabelIds: ['UNREAD'],
    },
  });
}

export async function applyLabel(emailId: string, labelName: string) {
  const labelRes = await gmail.users.labels.list({ userId: 'me' });
  const label = labelRes.data.labels?.find((l) => l.name === labelName);

  let labelId = label?.id;

  if (!labelId) {
    const createRes = await gmail.users.labels.create({
      userId: 'me',
      requestBody: {
        name: labelName,
        labelListVisibility: 'labelShow',
        messageListVisibility: 'show',
      },
    });
    labelId = createRes.data.id!;
  }

  await gmail.users.messages.modify({
    userId: 'me',
    id: emailId,
    requestBody: {
      addLabelIds: [labelId!],
    },
  });
}