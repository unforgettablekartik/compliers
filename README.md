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

## Subdomain Configuration

The application supports subdomain routing for the Markster™ service:

- **Main domain**: `thecompliers.com` - Hosts the main website and all standard routes
- **Markster subdomain**: `markster.thecompliers.com` - Automatically routes to the `/markster` section

### How it works

The middleware in `middleware.ts` detects requests to the `markster` subdomain and rewrites them to the `/markster` path:
- `markster.thecompliers.com/` → rewrites to `/markster`
- `markster.thecompliers.com/dashboard` → rewrites to `/markster/dashboard`

### DNS Configuration

To enable the subdomain in production, configure your DNS provider with an A or CNAME record:

```
Type: CNAME
Name: markster
Value: thecompliers.com (or your deployment domain)
```

For deployment platforms like Vercel, ensure the domain `markster.thecompliers.com` is added to your project's domain configuration.

## Development

Install dependencies and start the development server:

```
npm install
npm run dev
```

To test subdomain routing locally, you can:
1. Add entries to your `/etc/hosts` file:
   ```
   127.0.0.1 markster.localhost
   ```
2. Access the application at `http://markster.localhost:3000`
