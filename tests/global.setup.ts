import "dotenv/config";
import { test as setup, expect } from "@playwright/test";
import path from "path";

const TEST_EMAIL = process.env.TEST_EMAIL!;
const TEST_PASSWORD = process.env.TEST_PASSWORD!;
const authFile = path.join(__dirname, "../auth/storage-state.json");

setup("authenticate", async ({ page }) => {
  await page.goto("/auth/login");
  await page.locator('#email').fill(TEST_EMAIL);
  await page.locator('#password').fill(TEST_PASSWORD);
  await page.locator('button[type="submit"]').click();

  await expect(page).toHaveURL(/\/dashboard/, { timeout: 10_000 });
  await expect(page.getByText("Your Kanban Board")).toBeVisible();

  await page.context().storageState({ path: authFile });
});