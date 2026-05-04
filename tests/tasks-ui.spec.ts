import { test, expect } from "@playwright/test";
import { DashboardPage } from "../pages/dashboard.page";
import { TaskModal } from "../pages/task-modal.page";

async function cleanupTask(page: any, title: string) {
  const response = await page.request.get("/api/tasks");
  const tasks = await response.json();
  const task = tasks.find((t: { title: string }) => t.title === title);
  if (task) {
    await page.request.delete(`/api/tasks/${task.id}`);
  }
}

test.describe("Tasks — UI CRUD", () => {
  let dashboard: DashboardPage;
  let modal: TaskModal;

  const uniqueTitle = () => `task-${Date.now()}`;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);
    modal = new TaskModal(page);
    await dashboard.goto();
  });

  test("create task with all fields", async ({ page }) => {
    const title = uniqueTitle();
    await dashboard.addNewTaskButton.click();
    await modal.fillAndCreate(title, {
      description: "Test description",
      priority: "High",
    });

    await expect(dashboard.getTaskCard(title)).toBeVisible({ timeout: 5_000 });
    await expect(dashboard.getTaskCard(title)).toContainText("Priority: High");
    await expect(dashboard.getTaskCard(title)).toContainText("Status: Backlog");

    await cleanupTask(page, title);
  });

  test("create task with title only (minimum required)", async ({ page }) => {
    const title = uniqueTitle();
    await dashboard.addNewTaskButton.click();
    await modal.fillAndCreate(title, { priority: "Medium" });

    await expect(dashboard.getTaskCard(title)).toBeVisible({ timeout: 5_000 });

    await cleanupTask(page, title);
  });

  test("task card displays all fields correctly", async ({ page }) => {
    const title = uniqueTitle();
    await dashboard.addNewTaskButton.click();
    await modal.fillAndCreate(title, {
      description: "Visible description",
      priority: "Low",
    });

    const card = dashboard.getTaskCard(title);
    await expect(card).toBeVisible({ timeout: 5_000 });
    await expect(card).toContainText(title);
    await expect(card).toContainText("Priority: Low");
    await expect(card).toContainText("Status: Backlog");
    await expect(card).toContainText("Visible description");
    await expect(card).toContainText("Created:");

    await cleanupTask(page, title);
  });

  test("edit task title", async ({ page }) => {
    const title = uniqueTitle();
    const updatedTitle = `edited-${title}`;

    await dashboard.addNewTaskButton.click();
    await modal.fillAndCreate(title, { priority: "Medium" });
    await expect(dashboard.getTaskCard(title)).toBeVisible({ timeout: 5_000 });

    await dashboard.editTask(title);
    await modal.fillAndSave(updatedTitle);

    await expect(dashboard.getTaskCard(updatedTitle)).toBeVisible({
      timeout: 5_000,
    });

    await cleanupTask(page, updatedTitle);
  });

  test("delete task removes it from board", async ({ page }) => {
    const title = uniqueTitle();
    await dashboard.addNewTaskButton.click();
    await modal.fillAndCreate(title, { priority: "High" });
    await expect(dashboard.getTaskCard(title)).toBeVisible({ timeout: 5_000 });

    await dashboard.deleteTask(title);

    await expect(dashboard.getTaskCard(title)).not.toBeVisible({
      timeout: 5_000,
    });
  });
});