import unittest
from app.db import save_many_emails

class TestDB(unittest.TestCase):
    def test_save_many_emails(self):
        emails = [
            {'id': '1', 'from': 'test@example.com', 'subject': 'Hello', 'snippet': 'Test', 'timestamp': 0},
        ]
        try:
            save_many_emails(emails)
        except Exception as e:
            self.fail(f"save_many_emails raised Exception unexpectedly: {e}")

if __name__ == "__main__":
    unittest.main()
