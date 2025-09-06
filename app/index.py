from app.fetch_emails import fetch_unread_emails
from app.rules_engine import apply_rules
from app.db import save_many_emails

def run() -> None:
    """
    Fetch unread emails, save them, and apply rules.
    """
    emails = fetch_unread_emails(10)
    save_many_emails(emails)
    apply_rules(emails)

if __name__ == "__main__":
    run()
