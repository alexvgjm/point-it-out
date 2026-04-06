import { test, test as it, expect, type Page } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'
import { DEFAULT_SHAPE } from '../../src/lib/pointers/arrow'

declare global {
	interface Window {
		pio: typeof pio;
		testArrow: { destroy: () => void };
	}
}

test.describe('create(\'arrow\')', () => {
	const testsTargets = [{ xW: 300, xH: 300 }]

	test.describe('Default behavior (no options)', () => {
		testsTargets.forEach(({ xW, xH }) => {
			it(`creates an orange arrow pointing to center at 45º CW (${xW}x${xH})`, async ({
				page
			}, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/${xW}x${xH}`,
					expectedURL: `/${xW}x${xH}/arrow/default`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) => {
								pio.create('arrow', {
									target: `.test-box--${xW}x${xH}`
								})
							},
							{ xW, xH }
						)
					},
					pwPage: page,
					pwTestInfo: testInfo
				})
			})
		})
	})

	test.describe('Options', () => {
		testsTargets.forEach(({ xW, xH }) => {
			test.describe(`strokeWidth, strokeColor & fill (${xW}x${xH})`, () => {
				it('renders a darkorange stroke color by default if only strokeWidth', async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/stroke-fill-strokewidth-options/only-strokewidth`,
						action: () => {
							return page.evaluate(() => {
								pio.create('arrow', {
									target: '.test-box',
									strokeWidth: 8
								})
							})
						},
						pwPage: page,
						pwTestInfo: testInfo
					})
				})

				test('all options', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/stroke-fill-strokewidth-options`,
						action: () => {
							return page.evaluate(() => {
								pio.create('arrow', {
									target: '.test-box',
									strokeWidth: 8,
									strokeColor: 'darkgreen',
									fillColor: 'limegreen'
								})
							})
						},
						pwPage: page,
						pwTestInfo: testInfo
					})
				})
			})

			test.describe(`size (${xW}x${xH})`, () => {
				;['xs', 'sm', 'md', 'lg', 'xl', 'xxl'].forEach((sizeName) => {
					it(`accepts '${sizeName}' as size`, async ({ page }, testInfo) => {
						await visualComparisonBetweenPages({
							testingURL: `/${xW}x${xH}`,
							expectedURL: `/${xW}x${xH}/arrow/size-option/${sizeName}`,
							action: () => {
								return page.evaluate(
									({ sizeName }) => {
										pio.create('arrow', {
											target: '.test-box',
											scale: sizeName
										})
									},
									{ sizeName: sizeName as pio.NamedScale }
								)
							},
							pwPage: page,
							pwTestInfo: testInfo
						})
					})
				})
			})

			test.describe(`shape (${xW}x${xH})`, () => {
				it('renders aggressive tips with head curvature', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/custom-shape/tip-taper`,
						pwPage: page,
						pwTestInfo: testInfo,
						action: () => page.evaluate((shapeParams) => {
							window.pio.create('arrow', {
								target: '.test-box',
								shape: { ...shapeParams, tipTaper: 12 }
							})
						}, DEFAULT_SHAPE)
					})
				})

				test('test tailCurvature + baseCurvature + headCurvature', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/custom-shape/curvatures`,
						pwPage: page,
						pwTestInfo: testInfo,
						action: () => page.evaluate((shapeParams) => {
							window.pio.create('arrow', {
								target: '.test-box',
								shape: { ...shapeParams, tailCurvature: 20, baseCurvature: 20, headCurvature: 15 }
							})
						}, DEFAULT_SHAPE)
					})
				})

				test('test with all shape parameters', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/custom-shape/all`,
						pwPage: page,
						pwTestInfo: testInfo,
						action: () => page.evaluate((shapeParams) => {
							window.pio.create('arrow', {
								target: '.test-box',
								shape: {
									...shapeParams,
									tailWidth: 32, tailLength: 100, headWidth: 100, headLength: 70,
									tipTaper: 50, baseCurvature: 25, tailCurvature: 25, headCurvature: 20
								},
							})
						}, DEFAULT_SHAPE)
					})
				})

				it('test tailWdith and headWitdth', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/custom-shape/width`,
						pwPage: page,
						pwTestInfo: testInfo,
						action: () => page.evaluate((shapeParams) => {
							window.pio.create('arrow', {
								target: '.test-box',
								shape: { ...shapeParams, tailWidth: 15, headWidth: 40 }
							})
						}, DEFAULT_SHAPE)
					})
				})

				it('test tailLength and headLength', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/arrow/custom-shape/length`,
						pwPage: page,
						pwTestInfo: testInfo,
						action: () => page.evaluate((shapeParams) => {
							window.pio.create('arrow', {
								target: '.test-box',
								shape: { ...shapeParams, tailLength: 30, headLength: 30 }
							})
						}, DEFAULT_SHAPE)
					})
				})
			})

			test('test arrow vertical stability during shape modification', async ({ page }) => {
				await page.goto(`/${xW}x${xH}`)
				await page.waitForFunction(() => window.pio !== undefined)
				await page.evaluate(() => {
					window.testArrow = window.pio.create('arrow', {
						target: '.test-box',
						shape: { tailWidth: 40, headWidth: 40, tailLength: 100, headLength: 50 }
					})
				})
				const boxInicial = await page.locator('svg path').boundingBox()
				const centerYInicial = boxInicial!.y + (boxInicial!.height / 2)
				await page.evaluate(() => {
					window.testArrow.destroy()
					window.pio.create('arrow', {
						target: '.test-box',
						shape: { tailWidth: 40, headWidth: 10, tailLength: 100, headLength: 50 }
					})
				})
				const boxFinal = await page.locator('svg path').boundingBox()
				const centerYFinal = boxFinal!.y + (boxFinal!.height / 2)
				expect(Math.abs(centerYInicial - centerYFinal)).toBeLessThan(0.5)
			})

			test.describe(`responsive (${xW}x${xH})`, { tag: '@responsive' }, () => {
				async function expectArrowInsideContainer(page: Page, tolerance = 10, negate = false) {
					const container = await page.getByTestId('limited-container').boundingBox()
					const arrow = await page.locator('.test-arrow svg').boundingBox()
					const cx = container!.x + container!.width
					const ax = arrow!.x + arrow!.width

					if (negate) {
						expect(ax).toBeGreaterThan(cx + tolerance)
					} else {
						expect(ax).toBeLessThanOrEqual(cx + tolerance)
					}
				}

				const testingURL = `/${xW}x${xH}/arrow/responsive-option`

				it('rotates to fit if responsive: \'rotate\'', async ({ page }) => {
					await page.goto(testingURL, { waitUntil: 'networkidle' })
					await page.evaluate(() => {
						pio.create('arrow', {
							target: '.test-box',
							className: 'test-arrow',
							container: '.limited-container',
							responsive: 'rotate',
							scale: 1.75
						})
					})
					await expectArrowInsideContainer(page)
				})

				it('scale to fit if responsive: \'scale\'', async ({ page }) => {
					await page.goto(testingURL, { waitUntil: 'networkidle' })
					await page.evaluate(() => {
						pio.create('arrow', {
							target: '.test-box',
							className: 'test-arrow',
							container: '.limited-container',
							responsive: 'scale',
							scale: 1.75
						})
					})
					await expectArrowInsideContainer(page)
				})

				it('scale to fit if responsive until \'scale\'', async ({ page }) => {
					await page.goto(testingURL, { waitUntil: 'networkidle' })
					await page.evaluate(() => {
						pio.create('arrow', {
							target: '.test-box',
							className: 'test-arrow',
							container: '.limited-container',
							responsive: {
								type: 'scale',
								minScale: 2
							},
							scale: 2.5
						})
					})
					await expectArrowInsideContainer(page, 10, true)
				})
			})
		})
	})
})
