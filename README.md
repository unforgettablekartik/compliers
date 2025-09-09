# Compliers Next

This Next.js project uses Notion as a data source. Configure the following environment variables before running or deploying the app:

```
NOTION_SECRET=<your integration secret>
NOTION_DATABASE_ID=<database id>
```

Create a `.env.local` file in the project root or set the variables in your deployment environment so they are available at build and runtime.

## Development

Install dependencies and start the development server:

```
npm install
npm run dev
```
