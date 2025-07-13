
MailMorph

MailMorph is a backend automation tool that connects to the Gmail API, fetches emails, stores them in a PostgreSQL database, and applies custom rules (defined in rules.json) to take automated actions like marking emails as read or unread, or moving them to specific labels.

Features
	•	Connects to Gmail using OAuth 2.0
	•	Fetches unread or recent emails using the Gmail API
	•	Parses sender, subject, snippet, and timestamp
	•	Stores email metadata in PostgreSQL
	•	Applies user-defined rules to automate email actions
	•	Supports modular actions such as labeling or marking as read
	•	Uses environment variables securely via .env file

Tech Stack
	•	Node.js
	•	TypeScript
	•	PostgreSQL
	•	Gmail API (googleapis package)
	•	pg (PostgreSQL client for Node)
	•	dotenv
	•	ts-node

Folder Structure

src/
auth.ts            - Handles Gmail OAuth2 setup
db.ts              - Database connection and query functions
fetchEmails.ts     - Fetches and parses Gmail messages
actions.ts         - Performs Gmail actions (label, read/unread)
rulesEngine.ts     - Loads and applies rules from rules.json
index.ts           - Main execution entry point
testGmail.ts       - For testing Gmail connectivity
testFetch.ts       - For testing email fetching

Setup Instructions
	1.	Clone the repository
	2.	Run npm install to install dependencies
	3.	Set up a Gmail API project in Google Cloud Console
	4.	Download the credentials JSON and save it as credentials.json in the root folder
	5.	Create a .env file and add your PostgreSQL connection string
Example:
DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_database
	6.	Run the OAuth setup to generate tokens:
npx ts-node src/testGmail.ts
	7.	Run the main application:
npx ts-node src/index.ts

Rule Engine

Define your automation rules in a rules.json file. Example rule:

[
{
“from”: “example@example.com”,
“subjectContains”: “Invoice”,
“actions”: [“markAsRead”, “applyLabel:Finance”]
}
]

Supported actions:
	•	markAsRead
	•	markAsUnread
	•	applyLabel:

License

MIT License



