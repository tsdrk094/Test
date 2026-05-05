# Bugs — todotest.site

**1. Task status resets after tab switch or page reload**
Drag a task to another column — card moves in the UI and PUT fires (confirmed in Network tab) — but after switching browser tab and coming back, the task is back in its original column. Status is not persisted on the server.

**2. Description disappears from card after drag & drop**
Move a task between columns — description vanishes from the card. API still has it (confirmed via Network tab). Frontend likely rebuilds the card from the PUT response which only returns `{ status }`, ignoring the rest of the fields.

**3. Tasks jump to wrong column when creating a new task**
Had a task in "In Progress", created a new one — the existing task moved itself to Backlog with no user action. Happens after the re-fetch triggered by POST.

**4. No confirmation email after registration**
Registered a new account, no email received. Unclear if intentional — nothing in the UI mentions email verification.

**5. /dashboard accessible without login**
Open `/dashboard` in incognito — shows "Loading..." forever, no redirect to login. Server middleware does not protect the route.

**6. Page title is "Create Next App"**
Default Next.js page title was never changed. Visible in the browser tab.

**7. Card heights are inconsistent across columns**
Same content renders at different heights depending on which column the card is in. Layout/padding issue.

**8. Task card has asymmetric border styling**
Cards display a thick colored left border for priority indication combined with a thin neutral border on the remaining three sides. The inconsistency between border widths and colors across sides looks unpolished. 

**9. Card height is inconsistent**
Task cards with identical content structure render at different heights.
