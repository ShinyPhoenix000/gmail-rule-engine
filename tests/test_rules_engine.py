import unittest
from app.rules_engine import apply_rules

class TestRulesEngine(unittest.TestCase):
    def test_apply_rules(self):
        emails = [
            {'id': '1', 'from': 'test@example.com', 'subject': 'Hello', 'snippet': '', 'timestamp': 0},
            {'id': '2', 'from': 'newsletter@example.com', 'subject': 'Invoice', 'snippet': '', 'timestamp': 0}
        ]
        # This test just ensures the function runs without error
        try:
            apply_rules(emails)
        except Exception as e:
            self.fail(f"apply_rules raised Exception unexpectedly: {e}")

if __name__ == "__main__":
    unittest.main()
