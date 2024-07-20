import { expect, Page, TestInfo } from "@playwright/test"
import { randomUUID } from "crypto";

type TestPagesParams = {
    expectedURL: string,
    testingURL: string,
    action: () => Promise<unknown>
    pwPage: Page,
    pwTestInfo: TestInfo,
}

let generated = new Set<string>()

export async function visualComparisonBetweenPages(params: TestPagesParams) {
    const page = params.pwPage

    let id: string
    do { 
        id = randomUUID() 
        id = id.substring(id.lastIndexOf('-') + 1)
    } while (generated.has(id));
    generated.add(id)
    
    const dir = params.pwTestInfo.snapshotDir
    const projectName = params.pwTestInfo.project.name
    const suffix = params.pwTestInfo.snapshotSuffix
    
    await page.goto(params.expectedURL);
    await page.screenshot({path: `${dir}/${id}-${projectName}-${suffix}.png`,
        scale: 'css'});

    await page.goto(params.testingURL);
    await params.action()
    await expect(page).toHaveScreenshot([`${id}.png`])
}