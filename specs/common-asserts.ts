import { expect, Page } from "@playwright/test"

export const expectCreatedSVGElementAsBodyChild = async (page: Page) => {
    await expect(page.locator('svg')).toBeAttached()
}

export const expectCreatedSVGElementContainsClass = async (page: Page, className: string) => {
    await expect(page.locator('svg')).toHaveClass(className)
}