# Code Citations

## License: unknown
https://github.com/oumpy/CommBridge/tree/4abb15af983b6ec5e7a642ce697c0e2e890668c5/fetchgmail/fetchgmail.py

```
else:
            flow = InstalledAppFlow.from_client_secrets_file(creds_path, SCOPES)
            creds = flow.run_local_server(port=0)
        with open(token_path, 'w') as token:
            token.write(creds.to_json())
    return build('gmail', 'v1',
```

