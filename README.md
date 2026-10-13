# IQ Educational Computer Institute

A role-based educational institute management system for managing students, courses, topics, batches, admissions, enrollments, and academic operations. The application provides secure authentication and authorization for administrative and student workflows.

### Live Demo

- **Application:** [iq-institute-demo](https://iq-institute-demo.vercel.app/admin/students)
- **Role:** Admin
- **Email:** `admin@demo.com`
- **Password:** `DemoPassword@123`

> This demo uses fictional data and a separate database. No real institute data is exposed.

## Features

- **Authentication & Authorization:** Secure login and role-based access control.
- **Student Management:** Manage student records and details.
- **Course & Topic Management:** Create and manage courses and their associated topics.
- **Batch Management:** Organize courses into batches.
- **Admission & Enrollment Management:** Manage student admissions and enrollments.
- **Automated Testing:** API tests with Vitest, Supertest, and MongoDB Memory Server.

## Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Frontend:** Next.js | React.js
- **Backend:** Express.js
- **Database:** MongoDB with Mongoose
- **Validation:** Zod
- **Testing:** Vitest, Supertest, MongoDB Memory Server
- **Package Manager:** pnpm
- **Monorepo:** Turborepo

## Prerequisites

Install the following before getting started:

- [Node.js](https://nodejs.org/) — use a version compatible with the repository's `engines` field, if configured.
- [pnpm](https://pnpm.io/installation) — use the version specified in the root `package.json`, if available.
- [Git](https://git-scm.com/)

A local MongoDB installation is not required to run tests that use MongoDB Memory Server.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/786mrnoor/iq-institute-turborepo.git
cd iq-institute-turborepo
```

Replace `<repository-url>` with the repository's Git URL and `<repository-folder>` with the cloned directory name.

### 2. Install dependencies

Run the following command from the monorepo root:

```bash
pnpm install
```

This installs the workspace dependencies managed by pnpm.

### 3. Configure environment variables

#### Nextjs (apps/web/.env)
```
NEXT_REVALIDATION_SECRET='my-secret-key-of-revalidation'
NEXT_BACKEND_URL='http://localhost:5000'
NEXT_ADMIN_URL='http://localhost:5173'
```

#### Backend (apps/backend/.env)
```
NODE_ENV=
BACKEND_PORT=
BACKEND_JWT_SECRET_KEY=
BACKEND_MONGODB_URI=
BACKEND_REVALIDATION_SECRET=
BACKEND_NEXT_APP_URL=
MONGOMS_PREFER_GLOBAL_PATH=true
```

### 4. Start the application

Use the scripts defined in the root and application `package.json` files.

For example, to start the backend if its package defines a `dev` script:

```bash
pnpm --filter backend dev
```

To start other applications, use their respective development scripts.

## Testing

The backend API tests use **Vitest**, **Supertest**, and **MongoDB Memory Server**.

MongoDB Memory Server starts an isolated MongoDB instance for tests, allowing API tests to run without connecting to a real development or production database.

### 1. Test configuration

The repository uses the following configuration to reuse the MongoDB binary cache and avoid unnecessary downloads.

**Root `package.json`**

Ensure the following configuration exists:

```json
{
  "config": {
    "mongodbMemoryServer": {
      "preferGlobalPath": true
    }
  }
}
```

Merge this into the existing `package.json`; do not replace the other fields.

**`apps/backend/.env.test`**

Ensure this file contains:

```env
MONGOMS_PREFER_GLOBAL_PATH=true
```

This tells MongoDB Memory Server to prefer its global binary cache.

**Vercel production environment**

Configure the following environment variable in the Vercel project's production environment:

```env
DISABLE_POSTINSTALL=true
```

This prevents the MongoDB Memory Server postinstall download process from running during deployment. It does not disable MongoDB Memory Server when tests explicitly run.

### 2. Run all backend tests

From the monorepo root:

```bash
pnpm --filter backend test
```

### 3. Run tests in watch mode

```bash
pnpm --filter backend test:watch
```

These commands assume the corresponding scripts are defined in `apps/backend/package.json`.

### 4. Run individual tests

To run a specific test file, pass its path using the argument syntax supported by the backend's test script.

For example:

```bash
pnpm --filter backend test -- tests/auth/login.test.ts
```

Adjust the path to match the test file you want to execute.

### Test directory structure

The backend test suite follows a feature-based structure:

```text
apps/backend/
├── src/
├── tests/
│   ├── auth/
│   │   ├── login.test.ts
│   │   └── middleware.test.ts
│   ├── topics/
│   │   ├── create-topic.test.ts
│   │   ├── list-topics.test.ts
│   │   ├── update-topic.test.ts
│   │   └── delete-topic.test.ts
│   └── ...
├── .env.test
├── vitest.config.ts
└── package.json
```

The exact test files may vary as the project evolves.

### First test run

On the first run, MongoDB Memory Server may download the MongoDB binary required by the configured version. An internet connection may be required for this initial download.

On Windows, the global cache is typically located at:

```text
C:\Users\<username>\.cache\mongodb-binaries
```

Subsequent test runs can reuse the cached binary.

**Testing safety:** Tests should use the isolated in-memory test database and must not connect to production or development databases. Ensure the test configuration and database setup enforce this separation.

## Project Structure

```text
.
├── apps/
│   └── backend/
│       ├── src/
│       ├── tests/
│       ├── .env.test
│       ├── vitest.config.ts
│       └── package.json
├── packages/
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```

This is a representative monorepo structure. Additional applications and shared packages may exist in the repository.

## Development Workflow

1. Clone the repository and install dependencies.
2. Configure the required environment variables.
3. Start the relevant application.
4. Run backend tests before submitting changes.
5. Review test coverage and ensure existing tests continue to pass.

### Quick reference

| Task | Command |
|---|---|
| Install dependencies | `pnpm install` |
| Run all apps in dev mode | `pnpm dev` |
| Run backend in dev mode | `pnpm --filter backend dev` |
| Build all apps | `pnpm build` |
| Build backend app | `pnpm --filter backend build` |
| Run all tests | `pnpm test` |
| Run backend tests | `pnpm --filter backend test` |
| Watch backend tests | `pnpm --filter backend test:watch` |
