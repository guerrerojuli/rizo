# rizo: An RSS Feed Application

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), enhanced with several modern technologies to create a robust RSS feed application.

## Project Overview

Rizo is an application designed to fetch, parse, and display RSS feeds, providing a streamlined reading experience. It utilizes Drizzle ORM for database interactions, potentially with a PostgreSQL backend, and incorporates user authentication.

## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with Turbopack)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components**: [@headlessui/react](https://headlessui.com/), [@heroicons/react](https://heroicons.com/)
*   **ORM**: [Drizzle ORM](https://orm.drizzle.team/) (with `drizzle-kit` for migrations)
*   **Database**: Likely PostgreSQL (inferred from `postgres` package)
*   **Authentication**: `better-auth`
*   **RSS Parsing**: `rss-parser`
*   **Linting**: [ESLint](https://eslint.org/)
*   **Package Manager**: [pnpm](https://pnpm.io/)

## Getting Started

First, set up your environment variables. This project uses `dotenv`, so create a `.env` file based on `.env.example` (if available) or configure the necessary variables for database connection, authentication, etc.

Then, install dependencies:

```bash
pnpm install
```

Next, run the development server:

```bash
pnpm dev
```
This command starts the Next.js development server with Turbopack enabled.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/app/page.tsx` (assuming App Router usage). The page auto-updates as you edit the file.

### Other Available Scripts

*   **Build for production**:
    ```bash
    pnpm build
    ```
*   **Start production server**:
    ```bash
    pnpm start
    ```
*   **Lint project files**:
    ```bash
    pnpm lint
    ```

### Database Migrations

This project uses Drizzle ORM. To manage database schemas and migrations, you will use `drizzle-kit`. Refer to the [Drizzle Kit documentation](https://orm.drizzle.team/kit-docs/overview) for commands related to generating and applying migrations. Common commands might look like:
```bash
# Generate SQL migration files (example)
pnpm drizzle-kit generate

# Apply migrations to the database (example)
pnpm drizzle-kit migrate
```
Ensure your database connection string is correctly configured in your environment variables and `drizzle.config.ts`.

## Learn More

To learn more about the core technologies used in this project, take a look at the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
*   [Drizzle ORM Documentation](https://orm.drizzle.team/docs/overview) - learn about Drizzle ORM.
*   [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
*   [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) and [the Drizzle ORM GitHub repository](https://github.com/drizzle-team/drizzle-orm).

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
