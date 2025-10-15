# Compliers Next

This Next.js project uses Notion as a data source. Configure the following environment variables before running or deploying the app:

```
NOTION_TOKEN=<your integration secret>
NOTION_DATABASE_ID=<database id>
```

### Contact Form API

The contact form API (`/api/contact`) requires SMTP configuration to send emails:

```
SMTP_HOST=<smtp server hostname, e.g., smtp.gmail.com>
SMTP_PORT=<smtp port, usually 587 for TLS or 465 for SSL>
SMTP_USER=<smtp username/email for authentication>
SMTP_PASS=<smtp password or API key>
SMTP_FROM=<email address to send from>
```

Create a `.env.local` file in the project root or set the variables in your deployment environment so they are available at build and runtime.

## Development

Install dependencies and start the development server:

```
npm install
npm run dev
```
