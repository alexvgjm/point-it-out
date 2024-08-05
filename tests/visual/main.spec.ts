import { test, test as it } from '@playwright/test';
import { visualComparisonBetweenPages } from './test-utils';
import * as pio from '../../src/lib/main';

test.describe('System options', () => {
	test.describe('updateOnResize', () => {
		it("created SVG doesn't follow target when resize if updateOnResize is false", async ({
			page
		}, testInfo) => {
			await visualComparisonBetweenPages({
				testingURL: `/rect/300x300`,
				expectedURL: `/rect/300x300/default`,
				not: true,

				beforeExpectedScreenshot: async () =>
					await page.setViewportSize({ width: 600, height: 600 }),

				beforeAction: async () => await page.setViewportSize({ width: 1280, height: 768 }),

				action: async () => {
					await page.evaluate(() => {
						pio.config({ updateOnResize: false });

						pio.create('rect', {
							target: `.test-box`,
							className: `result`
						});
					});
				},

				beforeActionScreenshot: async () => await page.setViewportSize({ width: 600, height: 600 }),

				pwPage: page,
				pwTestInfo: testInfo
			});
		});
	});
});

test.describe('Common options', () => {
	test.describe('container option', () => {
		it('creates the pointer inside the container', async ({ page }, testInfo) => {
			await visualComparisonBetweenPages({
				testingURL: `/rect/300x300/scroll`,
				expectedURL: `/rect/300x300/scroll/container-option`,

				action: async () => {
					await page.evaluate(() => {
						pio.config({ updateOnResize: false });

						pio.create('rect', {
							target: `.test-box`,
							className: `result`,
							container: '.test-box'
						});
					});
				},

				pwPage: page,
				pwTestInfo: testInfo
			});
		});
	});
});
