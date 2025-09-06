from typing import Any
from app.auth import get_gmail_service

def mark_email_as_read(email_id: str) -> None:
    """
    # ...existing code...
    """
    service = get_gmail_service()
    service.users().messages().modify(
        userId='me',
        id=email_id,
        body={'removeLabelIds': ['UNREAD']}
    ).execute()

def apply_label(email_id: str, label_name: str) -> None:
    """
    # ...existing code...
    """
    service = get_gmail_service()
    labels_res = service.users().labels().list(userId='me').execute()
    labels = labels_res.get('labels', [])
    label_id = None
    for label in labels:
        if label['name'] == label_name:
            label_id = label['id']
            break
    if not label_id:
        create_res = service.users().labels().create(
            userId='me',
            body={
                'name': label_name,
                'labelListVisibility': 'labelShow',
                'messageListVisibility': 'show',
            }
        ).execute()
        label_id = create_res['id']
    service.users().messages().modify(
        userId='me',
        id=email_id,
        body={'addLabelIds': [label_id]}
    ).execute()
