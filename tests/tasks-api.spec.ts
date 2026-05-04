import { test, expect } from "@playwright/test";

test.describe("Tasks — API", () => {
  test("GET /api/tasks returns 200 and array", async ({ request }) => {
    const response = await request.get("/api/tasks");
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test("POST /api/tasks creates a task with valid data", async ({
    request,
  }) => {
    const title = `api-task-${Date.now()}`;
    const response = await request.post("/api/tasks", {
      data: {
        title,
        description: "API test description",
        priority: "High",
      },
    });

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.title).toBe(title);
    expect(body.description).toBe("API test description");
    expect(body.priority).toBe("High");
    expect(body.status).toBe("Backlog");
    expect(body.id).toBeDefined();
    expect(body.userId).toBeDefined();
    expect(body.createdAt).toBeDefined();

    await request.delete(`/api/tasks/${body.id}`);
  });

  test("POST /api/tasks without title returns 400", async ({ request }) => {
    const response = await request.post("/api/tasks", {
      data: {
        description: "No title",
        priority: "High",
      },
    });

    expect(response.status()).toBe(400);
  });

  test("POST /api/tasks without priority returns 400", async ({ request }) => {
    const response = await request.post("/api/tasks", {
      data: {
        title: "No priority task",
      },
    });

    expect(response.status()).toBe(400);
  });

  test("GET /api/tasks without auth returns 401", async ({ browser }) => {
    const context = await browser.newContext({ storageState: undefined });
    const request = context.request;

    const response = await request.get("https://todotest.site/api/tasks");
    expect(response.status()).toBe(401);

    await context.close();
  });

  test("GET /api/tasks/:id returns single task", async ({ request }) => {
    const createResponse = await request.post("/api/tasks", {
      data: {
        title: `single-get-${Date.now()}`,
        priority: "High",
      },
    });
    const task = await createResponse.json();

    const response = await request.get(`/api/tasks/${task.id}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.id).toBe(task.id);
    expect(body.title).toBe(task.title);

    await request.delete(`/api/tasks/${task.id}`);
  });
});
