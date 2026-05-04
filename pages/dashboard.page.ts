import { type Page, type Locator, expect } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly heading: Locator;
  readonly addNewTaskButton: Locator;
  readonly logoutButton: Locator;

  readonly columns: {
    backlog: Locator;
    todo: Locator;
    inProgress: Locator;
    done: Locator;
  };

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole("heading", { name: "Your Kanban Board" });
    this.addNewTaskButton = page.getByRole("button", { name: "Add New Task" });
    this.logoutButton = page.getByRole("button", { name: "Logout" });

    this.columns = {
      backlog: page.locator('[data-rfd-droppable-id="Backlog"]'),
      todo: page.locator('[data-rfd-droppable-id="Todo"]'),
      inProgress: page.locator('[data-rfd-droppable-id="In Progress"]'),
      done: page.locator('[data-rfd-droppable-id="Done"]'),
    };
  }

  async goto() {
    await this.page.goto("/dashboard");
    await expect(this.heading).toBeVisible({ timeout: 10_000 });
  }

  getTaskCard(title: string): Locator {
    return this.page.locator('[data-slot="card"]').filter({ hasText: title });
  }

  getTaskMenuButton(title: string): Locator {
    return this.getTaskCard(title).locator('[data-slot="dropdown-menu-trigger"]');
  }

  async openTaskMenu(title: string) {
    await this.getTaskMenuButton(title).click();
  }

  async deleteTask(title: string) {
    await this.openTaskMenu(title);
    await this.page.getByRole("menuitem", { name: "Delete" }).click();
  }

  async editTask(title: string) {
    await this.openTaskMenu(title);
    await this.page.getByRole("menuitem", { name: "Edit" }).click();
  }

  async logout() {
    await this.logoutButton.click();
  }
}