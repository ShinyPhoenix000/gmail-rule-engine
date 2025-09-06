from typing import List, Dict, Any
from app.auth import get_gmail_service

def fetch_unread_emails(limit: int = 50) -> List[Dict[str, Any]]:
    """
    Fetch unread emails from Gmail and parse sender, subject, snippet, and timestamp.
    """
    service = get_gmail_service()
    res = service.users().messages().list(userId='me', q='', maxResults=limit).execute()
    messages = res.get('messages', [])
    parsed_emails = []
    for msg in messages:
        detail = service.users().messages().get(userId='me', id=msg['id']).execute()
        headers = detail['payload'].get('headers', [])
        from_ = next((h['value'] for h in headers if h['name'] == 'From'), 'Unknown')
        subject = next((h['value'] for h in headers if h['name'] == 'Subject'), '(No Subject)')
        snippet = detail.get('snippet', '')
        timestamp = int(detail.get('internalDate', '0'))
        parsed_emails.append({
            'id': detail['id'],
            'from': from_,
            'subject': subject,
            'snippet': snippet,
            'timestamp': timestamp
        })
    return parsed_emails
