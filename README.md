## Running Tests

This project uses **Vitest**, **Supertest**, and **MongoDB Memory Server** for API integration tests.

Tests use a temporary MongoDB instance provided by `mongodb-memory-server`, so **you do not need to install MongoDB locally**.

### 1. Clone the repository

```bash
git clone https://github.com/786mrnoor/iq-institute-turborepo.git
cd iq-institute-turborepo
```

### 2. Install dependencies

```bash
pnpm install
```

The repository is configured to use the global MongoDB Memory Server binary cache when available.

### 3. Configure the test environment

The backend uses `.env.test` when running tests.

Make sure:

```text
apps/backend/.env.test
```

contains:

```env
MONGOMS_PREFER_GLOBAL_PATH=true
```

This tells `mongodb-memory-server` to use its global binary cache when possible.

> `.env.test` contains test-only configuration and should not contain production credentials.

### 4. Run the tests

From the repository root:

```bash
pnpm test
```

This runs the test tasks through Turborepo.

You can also run only the backend tests:

```bash
pnpm --filter backend test
```

### 5. First test run

On the first run, MongoDB Memory Server may download the required MongoDB binary.

For example:

```text
Downloading MongoDB "8.2.6": ...
```

The download can be several hundred MB and may take some time depending on your internet connection.

The binary is cached globally, so subsequent test runs normally reuse it.

On Windows, the cache is typically located at:

```text
C:\Users\<username>\.cache\mongodb-binaries
```

You **do not need to manually download or install MongoDB**.

### 6. Run tests in watch mode

For development:

```bash
pnpm --filter backend test:watch
```

This starts Vitest in watch mode and automatically reruns relevant tests when files change.

### 7. Test environment isolation

The API integration tests use a separate temporary MongoDB database.

Test data is cleaned after each test, so tests should not depend on data created by another test.

**Never point the test environment at your development or production MongoDB database.**

### 8. Production / Vercel

`mongodb-memory-server` is only used for testing. It is **not used as the production database**.

The Vercel deployment uses:

```env
DISABLE_POSTINSTALL=true
```

This prevents MongoDB Memory Server's postinstall behavior from downloading MongoDB during the production deployment.

Production uses the application's configured MongoDB connection instead.

### Quick reference

| Task | Command |
|---|---|
| Install dependencies | `pnpm install` |
| Run all tests | `pnpm test` |
| Run backend tests | `pnpm --filter backend test` |
| Watch backend tests | `pnpm --filter backend test:watch` |