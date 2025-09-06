import unittest
from app.fetch_emails import fetch_unread_emails

class TestFetchEmails(unittest.TestCase):
    def test_fetch_unread_emails(self):
        emails = fetch_unread_emails(1)
        self.assertIsInstance(emails, list)
        if emails:
            email = emails[0]
            self.assertIn('id', email)
            self.assertIn('from', email)
            self.assertIn('subject', email)
            self.assertIn('snippet', email)
            self.assertIn('timestamp', email)

if __name__ == "__main__":
    unittest.main()
