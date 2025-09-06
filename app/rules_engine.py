import json
import os
from typing import List, Dict, Any
from app.actions import mark_email_as_read, apply_label

def load_rules() -> List[Dict[str, Any]]:
    """
    Load rules from rules.json file.
    """
    with open(os.path.join(os.path.dirname(__file__), '..', 'rules.json'), 'r') as f:
        return json.load(f)

def apply_rules(emails: List[Dict[str, Any]]):
    """
    Apply rules to a list of emails.
    """
    rules = load_rules()
    for email in emails:
        for rule in rules:
            from_match = rule.get('criteria', {}).get('from') and rule['criteria']['from'] in email['from']
            subject_match = rule.get('criteria', {}).get('subject') and rule['criteria']['subject'] in email['subject']
            if from_match or subject_match:
                for action in rule.get('actions', []):
                    if action == 'markRead':
                        mark_email_as_read(email['id'])
                        # ...existing code...
                    elif action.startswith('applyLabel:'):
                        label = action.split(':', 1)[1]
                        apply_label(email['id'], label)
                        # ...existing code...
