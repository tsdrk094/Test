# Test Checklist — todotest.site

## Authentication

| Test | Type | Implemented |
|------|------|-------------|
| Successful login → redirect to dashboard | Auto | Yes |
| Wrong password → error message | Auto | Yes |
| Unregistered email → error | Auto | Yes |
| Register with existing email → conflict error | Auto | Yes |
| Register with mismatched passwords → error | Auto | Yes |
| /dashboard without auth → board content not exposed | Auto | Yes |
| Logout → redirect to login | Auto | Yes |
| Register with empty fields → validation | Auto | No |
| Access /auth/login while already logged in | Manual | No |
| Email confirmation after registration | Manual | No |

## Tasks — UI

| Test | Type | Implemented |
|------|------|-------------|
| Create task with all fields | Auto | Yes |
| Create task with title only (minimum required) | Auto | Yes |
| Card displays all fields correctly | Auto | Yes |
| Edit task title | Auto | Yes |
| Delete task | Auto | Yes |
| Empty title → validation error | Auto | No |
| Cancel modal without creating | Auto | No |
| Spaces-only title | Manual | Yes |
| Edit description | Manual | Yes |
| Edit priority | Manual | Yes |

## Tasks — Drag & Drop

| Test | Type | Implemented |
|------|------|-------------|
| Drag Backlog → Todo | Manual | Yes |
| Todo → In Progress | Manual | Yes |
| In Progress → Done | Manual | Yes |
| Move backwards Done → In Progress | Manual | Yes |

## Tasks — API

| Test | Type | Implemented |
|------|------|-------------|
| GET /api/tasks → 200, array | Auto | Yes |
| POST /api/tasks → 201, correct fields in response | Auto | Yes |
| POST without title → 400 | Auto | Yes |
| POST without priority → 400 | Auto | Yes |
| POST /api/tasks with title > 255 chars → 400 | Manual | No |
| POST /api/tasks with description > 1000 chars → 400 | Manual | No |
| GET without auth → 401 | Auto | Yes |
| GET /api/tasks/:id → 200, single task | Auto | Yes |
| PUT status update → verify with GET | Auto | No |
| DELETE → 204, then GET → 404 | Auto | No |
| PUT someone else's task → 403/404 | Manual | No |

## Visual

| Test | Type | Implemented |
|------|------|-------------|
| Priority colors: red / yellow / green borders | Manual | Yes |
| Responsive layout on mobile | Manual | Yes |
| Page title in browser tab | Manual | Yes |
