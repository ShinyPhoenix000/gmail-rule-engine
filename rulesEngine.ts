// src/rulesEngine.ts
import fs from 'fs';
import path from 'path';
import { ParsedEmail } from './fetchEmails';
import { markEmailAsRead, applyLabel } from './actions';

type Rule = {
  criteria: {
    from?: string;
    subject?: string;
  };
  actions: string[];
};

export async function applyRules(emails: ParsedEmail[]) {
  const raw = fs.readFileSync(path.join(__dirname, '..', 'rules.json'), 'utf8');
  const rules: Rule[] = JSON.parse(raw);

  for (const email of emails) {
    for (const rule of rules) {
      const fromMatch = rule.criteria.from && email.from.includes(rule.criteria.from);
      const subjectMatch = rule.criteria.subject && email.subject.includes(rule.criteria.subject);

      if (fromMatch || subjectMatch) {
        for (const action of rule.actions) {
          if (action === 'markRead') {
            await markEmailAsRead(email.id);
            console.log(`✅ Marked as read: ${email.subject}`);
          } else if (action.startsWith('applyLabel:')) {
            const label = action.split(':')[1];
            await applyLabel(email.id, label);
            console.log(`🏷️ Applied label "${label}" to: ${email.subject}`);
          }
        }
      }
    }
  }
}