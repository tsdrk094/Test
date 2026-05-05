# todotest-playwright

Playwright + TypeScript test suite for [todotest.site](https://todotest.site)

## How to run

```bash
npm install
npx playwright install chromium
cp .env.example .env   # fill in TEST_EMAIL and TEST_PASSWORD
npx playwright test
```

Individual suites:
```bash
npx playwright test tests/auth.spec.ts
npx playwright test tests/tasks-ui.spec.ts
npx playwright test tests/tasks-api.spec.ts
```

Report: `npx playwright show-report`

## Structure

```
tests/
  global.setup.ts       — logs in once, saves session for other tests
  auth.spec.ts           — login, register, logout, route guard
  tasks-ui.spec.ts       — create/edit/delete tasks via UI
  tasks-api.spec.ts      — REST API layer
pages/
  login.page.ts
  register.page.ts
  dashboard.page.ts
  task-modal.page.ts
auth/
  storage-state.json     — saved session (gitignored)
```

Auth state is saved after the first run and reused across all tests — no repeated logins.

## What I'd improve with more time

- Data isolation — unique test user per run so tests don't interfere with each other
- CI pipeline with GitHub Actions
- Contract tests — validate API responses against openapi.yaml schema
- More negative API cases (XSS in title, invalid UUIDs, huge payloads)
- Full E2E flow: register → login → create → drag → edit → delete → logout
- Allure reporter for richer HTML reports with steps, screenshots and history
- Custom fixtures for authenticated context and pre-created tasks to reduce test setup boilerplate
---
