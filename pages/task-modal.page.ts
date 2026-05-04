import { type Page, type Locator } from "@playwright/test";

export class TaskModal {
  readonly page: Page;
  readonly titleInput: Locator;
  readonly descriptionInput: Locator;
  readonly prioritySelect: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;
  readonly closeButton: Locator;
  readonly validationError: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titleInput = page.locator('input[name="title"]');
    this.descriptionInput = page.locator('textarea[name="description"]');
    this.prioritySelect = page.locator('select[aria-hidden="true"]');
    this.submitButton = page.locator('[data-slot="dialog-content"] button[type="submit"]');
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
    this.closeButton = page.locator('[data-slot="dialog-close"]');
    this.validationError = page.locator('[data-error="true"], .text-red-500, .text-destructive');
  }

  async fillAndCreate(
    title: string,
    options?: { description?: string; priority?: "High" | "Medium" | "Low" }
  ) {
    await this.titleInput.fill(title);

    if (options?.description) {
      await this.descriptionInput.fill(options.description);
    }

    if (options?.priority) {
      await this.prioritySelect.selectOption(options.priority);
    }

    await this.submitButton.click();
  }

  async fillAndSave(
    title: string,
    options?: { description?: string; priority?: "High" | "Medium" | "Low" }
  ) {
    await this.titleInput.clear();
    await this.titleInput.fill(title);

    if (options?.description !== undefined) {
      await this.descriptionInput.clear();
      await this.descriptionInput.fill(options.description);
    }

    if (options?.priority) {
      await this.prioritySelect.selectOption(options.priority);
    }

    await this.submitButton.click();
  }
}