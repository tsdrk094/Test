# todotest-playwright

Playwright + TypeScript test suite for [todotest.site](https://todotest.site).

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

- Data isolation — unique test user per run to avoid test interference
- CI pipeline with GitHub Actions
- Contract tests against the API schema (openapi.yaml)
- More negative API cases: XSS in title, invalid UUIDs, oversized payloads
- Full E2E: register → login → create → drag → edit → delete → logout

---

See [CHECKLIST.md](CHECKLIST.md) for the full test checklist and [BUGS.md](BUGS.md) for found issues.
