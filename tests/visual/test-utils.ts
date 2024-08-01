import { expect, type Page, type TestInfo } from '@playwright/test';
import { randomUUID } from 'crypto';

type TestPagesParams = {
	expectedURL: string;
	testingURL: string;
	beforeExpectedScreenshot?: () => Promise<unknown>;
	beforeAction?: () => Promise<unknown>;
	beforeActionScreenshot?: () => Promise<unknown>;
	action?: () => Promise<unknown>;
	pwPage: Page;
	pwTestInfo: TestInfo;
	not?: boolean;
};

const generated = new Set<string>();

export async function visualComparisonBetweenPages(params: TestPagesParams) {
	const page = params.pwPage;

	let id: string;
	do {
		id = randomUUID();
		id = id.substring(id.lastIndexOf('-') + 1);
	} while (generated.has(id));
	generated.add(id);

	const dir = params.pwTestInfo.snapshotDir;
	const projectName = params.pwTestInfo.project.name;
	const suffix = params.pwTestInfo.snapshotSuffix;

	await page.goto(params.expectedURL, { waitUntil: 'networkidle' });
	if (params.beforeExpectedScreenshot) {
		await params.beforeExpectedScreenshot();
	}
	await page.screenshot({
		path: `${dir}/${id}-${projectName}-${suffix}.png`,
		scale: 'css'
	});

	await page.goto(params.testingURL, { waitUntil: 'networkidle' });
	if (params.beforeAction) {
		await params.beforeAction();
	}
	if (params.action) {
		await params.action();
	}
	if (params.beforeActionScreenshot) {
		await params.beforeActionScreenshot();
	}

	if (params.not) {
		await expect(page).not.toHaveScreenshot([`${id}.png`]);
	} else {
		await expect(page).toHaveScreenshot([`${id}.png`]);
	}
}
