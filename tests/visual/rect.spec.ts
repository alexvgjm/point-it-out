import { test, test as it, expect } from '@playwright/test';
import { visualComparisonBetweenPages } from './test-utils';
import * as pio from '../../src/lib/main';

test.describe("create('rect')", () => {
	const testsTargets = [
		{ xW: 300, xH: 300 },
		{ xW: 400, xH: 250 }
	];

	testsTargets.forEach(({ xW, xH }, idx) => {
		it(
			"creates an SVG of approximately same width and height of target's" + ` rect (${xW}x${xH})`,
			async ({ page }) => {
				await page.goto(`/rect/${xW}x${xH}`, { waitUntil: 'networkidle' });

				const createdSVGRect = await page.evaluate(
					({ xW, xH, idx }) => {
						const selector = `.test-box--${xW}x${xH}`;
						pio.create('rect', { target: selector, className: `result${idx}` });

						const elm = document.querySelector(`.result${idx}`);
						return elm?.getBoundingClientRect();
					},
					{ xW, xH, idx }
				);

				expect(Math.abs(createdSVGRect!.width - xW)).toBeLessThanOrEqual(8);
				expect(Math.abs(createdSVGRect!.height - xH)).toBeLessThanOrEqual(8);
			}
		);

		it(`creates an SVG absolutely positioned over target (${xW}x${xH})`, async ({ page }) => {
			await page.goto(`/rect/${xW}x${xH}`, { waitUntil: 'networkidle' });
			const selector = `.test-box--${xW}x${xH}`;

			const [targetRect, createdSVGRect] = await page.evaluate(
				({ selector, idx }) => {
					// Should be unaffected by scroll
					window.scrollBy({ top: 100, behavior: 'instant' });
					pio.create('rect', { target: selector, className: `result${idx}` });
					const tgt = document.querySelector(selector);
					const elm = document.querySelector(`.result${idx}`);
					return [tgt?.getBoundingClientRect(), elm?.getBoundingClientRect()];
				},
				{ selector, idx }
			);

			expect(Math.abs(targetRect!.left - createdSVGRect!.left)).toBeLessThanOrEqual(8);
			expect(Math.abs(targetRect!.top - createdSVGRect!.top)).toBeLessThanOrEqual(8);
		});

		test(`created rect follow target element on resize (${xW}x${xH})`, async ({
			page
		}, testInfo) => {
			await visualComparisonBetweenPages({
				testingURL: `/rect/${xW}x${xH}`,
				expectedURL: `/rect/${xW}x${xH}/default`,

				beforeExpectedScreenshot: async () =>
					await page.setViewportSize({ width: 600, height: 600 }),

				beforeAction: async () => await page.setViewportSize({ width: 1280, height: 768 }),

				action: async () => {
					await page.evaluate(
						({ xW, xH }) =>
							pio.create('rect', {
								target: `.test-box--${xW}x${xH}`,
								className: `result`
							}),
						{ xW, xH }
					);
				},

				beforeActionScreenshot: async () => await page.setViewportSize({ width: 600, height: 600 }),

				pwPage: page,
				pwTestInfo: testInfo
			});
		});
		test(`created SVG should ignore pointer events and let pass through it (${xW}x${xH})`, async ({
			page
		}, testInfo) => {
			await page.goto(`/rect/${xW}x${xH}`, { waitUntil: 'networkidle' });
			const selector = `.test-box--${xW}x${xH}`;

			const targetRect = (await page.evaluate(
				({ selector, idx }) => {
					pio.create('rect', { target: selector, className: `result${idx}` });
					const tgt = document.querySelector(selector);
					// Remove target on click on it for testing
					tgt!.addEventListener('click', () => tgt!.remove());
					return tgt?.getBoundingClientRect();
				},
				{ selector, idx }
			)) as DOMRect;

			await page.mouse.click(
				targetRect.left + targetRect.width / 2,
				targetRect.top + targetRect.height / 2
			);

			await expect(page.locator(selector)).not.toBeAttached();
		});
	});

	test.describe('Default behavior (no options)', () => {
		testsTargets.forEach(({ xW, xH }, idx) => {
			it(`creates an orange rect with a width of 4px around target (${xW}x${xH})`, async ({
				page
			}, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/rect/${xW}x${xH}`,
					expectedURL: `/rect/${xW}x${xH}/default`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) => {
								pio.create('rect', {
									target: `.test-box--${xW}x${xH}`,
									className: `result`
								});
							},
							{ xW, xH }
						);
					},
					pwPage: page,
					pwTestInfo: testInfo
				});
			});
		});
	});

	test.describe('Options', () => {
		testsTargets.forEach(({ xW, xH }) => {
			test(`strokeWidth & color (${xW}x${xH})`, async ({ page }, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/rect/${xW}x${xH}`,
					expectedURL: `/rect/${xW}x${xH}/stroke-width-color-options`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) =>
								pio.create('rect', {
									target: `.test-box--${xW}x${xH}`,
									className: `result`,
									strokeWidth: 8,
									strokeColor: 'limegreen'
								}),
							{ xW, xH }
						);
					},
					pwPage: page,
					pwTestInfo: testInfo
				});
			});

			test(`padding (${xW}x${xH})`, async ({ page }, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/rect/${xW}x${xH}`,
					expectedURL: `/rect/${xW}x${xH}/padding-option`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) =>
								pio.create('rect', {
									target: `.test-box--${xW}x${xH}`,
									className: `result`,
									padding: 16
								}),
							{ xW, xH }
						);
					},
					pwPage: page,
					pwTestInfo: testInfo
				});
			});
		});

		test.describe('round', () => {
			testsTargets.forEach(({ xW, xH }) => {
				test(`rounded rect with rect with the specified pixels round (${xW}x${xH})`, async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/rect/${xW}x${xH}`,
						expectedURL: `/rect/${xW}x${xH}/round-option/pixels`,
						action: () => {
							return page.evaluate(
								({ xW, xH }) =>
									pio.create('rect', {
										target: `.test-box--${xW}x${xH}`,
										className: `result`,
										round: 32
									}),
								{ xW, xH }
							);
						},
						pwPage: page,
						pwTestInfo: testInfo
					});
				});

				test(`rounded rect with the specified percent round (${xW}x${xH})`, async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/rect/${xW}x${xH}`,
						expectedURL: `/rect/${xW}x${xH}/round-option/percent`,
						action: () => {
							return page.evaluate(
								({ xW, xH }) =>
									pio.create('rect', {
										target: `.test-box--${xW}x${xH}`,
										className: `result`,
										round: '20%'
									}),
								{ xW, xH }
							);
						},
						pwPage: page,
						pwTestInfo: testInfo
					});
				});

				test(`rounded rect with different hozirontal and vertical round (${xW}x${xH})`, async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/rect/${xW}x${xH}`,
						expectedURL: `/rect/${xW}x${xH}/round-option/x-and-y`,
						action: () => {
							return page.evaluate(
								({ xW, xH }) =>
									pio.create('rect', {
										target: `.test-box--${xW}x${xH}`,
										className: `result`,
										round: { rx: 128, ry: 64 }
									}),
								{ xW, xH }
							);
						},
						pwPage: page,
						pwTestInfo: testInfo
					});
				});
			});
		});
	});
});
