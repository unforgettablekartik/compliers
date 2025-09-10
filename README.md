# Compliers

This Next.js project uses Notion as a data source.

## Environment variables

Before building or deploying, set the following variables in your environment:

- `NOTION_SECRET`: Notion integration token used to authenticate API requests. A legacy name `NOTION_TOKEN` is also supported.
- `NOTION_DATABASE_ID`: Identifier of the Notion database that stores blog posts.

The application performs runtime checks and will surface a friendly message if either variable is missing to help surface misconfiguration early.
