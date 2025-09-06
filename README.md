# Gmail Automation Python Project

Automate Gmail workflows using Python. Fetch emails, apply rules from `rules.json`, and save results to PostgreSQL.

## Features
- Gmail API authentication (OAuth2)
- Fetch unread emails
- Parse sender, subject, snippet, timestamp
- Apply rules (label, mark as read, etc.) from `rules.json`
- Save results to PostgreSQL
- Unit tests for all major modules

## Project Structure
```
app/
  actions.py         # Gmail actions (mark as read, label)
  auth.py            # Gmail API authentication
  db.py              # PostgreSQL save logic
  fetch_emails.py    # Fetch and parse emails
  main.py            # Main workflow
  rules_engine.py    # Rule loading and application
  example_gmail_automation.py # Full workflow example

tests/
  test_fetch_emails.py
  test_rules_engine.py
  test_db.py

rules.json           # Example rules
requirements.txt     # Python dependencies
.gitignore           # Git ignore rules
credentials.json     # Gmail API credentials (not tracked)
README.md            # Project documentation
```

## Setup
1. Install dependencies:
   ```sh
   pip install -r requirements.txt
   ```
2. Set up Gmail API credentials:
   - Download `credentials.json` from Google Cloud Console.
   - Place it in the project root.
3. Set up PostgreSQL and create the `emails` table:
   ```sql
   CREATE TABLE emails (
     id TEXT PRIMARY KEY,
     from_address TEXT,
     subject TEXT,
     snippet TEXT,
     timestamp TIMESTAMP,
     actions JSONB
   );
   ```
4. Edit `rules.json` to define your rules.

## Running
Run the main workflow:
```sh
python -m app.main
```
Or run the full example:
```sh
python app/example_gmail_automation.py
```

## Testing
Run all tests:
```sh
python -m unittest discover tests
```

## Example `rules.json`
```json
[
  {
    "criteria": {"from": "newsletter@example.com"},
    "actions": ["applyLabel:NEWSLETTERS"]
  },
  {
    "criteria": {"subject": "Invoice"},
    "actions": ["markRead"]
  }
]
```
