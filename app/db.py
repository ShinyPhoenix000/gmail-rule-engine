import os
import psycopg2
from typing import List, Dict, Any

def save_many_emails(emails: List[Dict[str, Any]]) -> None:
    """
    Save a list of emails to the PostgreSQL database.
    """
    conn = psycopg2.connect(
        dbname=os.getenv('DB_NAME', 'gmaildb'),
        user=os.getenv('DB_USER', 'postgres'),
    password='your_password',
        host=os.getenv('DB_HOST', 'localhost'),
        port=os.getenv('DB_PORT', '5432')
    )
    cur = conn.cursor()
    for email in emails:
        cur.execute(
            """
            INSERT INTO emails (id, from_address, subject, snippet, timestamp)
            VALUES (%s, %s, %s, %s, to_timestamp(%s / 1000.0))
            ON CONFLICT (id) DO NOTHING
            """,
            (email['id'], email['from'], email['subject'], email['snippet'], email['timestamp'])
        )
    conn.commit()
    cur.close()
    conn.close()
