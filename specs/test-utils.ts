import { expect, Page, TestInfo } from "@playwright/test"

type TestPagesParams = {
    expectedURL: string,
    testingURL: string,
    action: () => Promise<unknown>
    pwPage: Page,
    pwTestInfo: TestInfo,
}

export async function visualComparisonBetweenPages(params: TestPagesParams) {
    const page = params.pwPage

    const dir = params.pwTestInfo.snapshotDir
    const name = params.pwTestInfo.project.name
    const suffix = params.pwTestInfo.snapshotSuffix

    await page.goto(params.expectedURL);
    await page.screenshot({path: `${dir}/1/1-${name}-${suffix}.png`});

    await page.goto(params.testingURL);
    await params.action()
    const snap2 = 
        await page.screenshot({path: `${dir}/2/2-${name}-${suffix}.png`});

    expect(snap2).toMatchSnapshot(['1', '1.png']);
}