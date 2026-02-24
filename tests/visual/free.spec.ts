import { test, test as it } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'
import { originToAngle } from '$lib/values'

test.describe('create(\'free\')', () => {
	const testsTargets = [{ xW: 300, xH: 300 }]

	test.describe('Default behavior (no options)', () => {
		testsTargets.forEach(({ xW, xH }) => {
			it('it uses the left-center as pointer tip by default and rotate 45degs', async ({
				page
			}, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/${xW}x${xH}/free`,
					expectedURL: `/${xW}x${xH}/free/default`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) => {
								pio.create('free', {
									target: `.test-box--${xW}x${xH}`,
									pointerElement: '.pointer-img'
								})
							},
							{ xW, xH }
						)
					},
					pwPage: page,
					pwTestInfo: testInfo
				})
			})

			test('using a div element', async ({ page }, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/${xW}x${xH}/free/using-element`,
					expectedURL: `/${xW}x${xH}/free/using-element/expected`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) => {
								pio.create('free', {
									target: `.test-box--${xW}x${xH}`,
									pointerElement: '.pointer-element'
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
			test.describe(`fromAngle (${xW}x${xH})`, () => {
				it('rotates the arrow from its tip to match specified angle', async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}`,
						expectedURL: `/${xW}x${xH}/free/from-option/60`,
						action: () => {
							return page.evaluate(() => {
								pio.create('arrow', {
									target: '.test-box',
									fromAngle: 60
								})
							})
						},
						pwPage: page,
						pwTestInfo: testInfo
					})
				})

				Object.entries(originToAngle).forEach(([angleString, angle]) => {
					it(`rotates the arrow in angle specified by origin string (${angleString})`, async ({
						page
					}, testInfo) => {
						await visualComparisonBetweenPages({
							testingURL: `/${xW}x${xH}`,
							expectedURL: `/${xW}x${xH}/free/from-option/${angle}`,
							action: () => {
								return page.evaluate(
									({ angleString }) => {
										pio.create('arrow', {
											target: '.test-box',
											fromAngle: angleString as pio.NamedOrigin
										})
									},
									{ angleString }
								)
							},
							pwPage: page,
							pwTestInfo: testInfo
						})
					})
				})
			})

			test.describe(`distance (${xW}x${xH})`, () => {
				it('separates the created arrow a number of pixels from center', async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}/free`,
						expectedURL: `/${xW}x${xH}/free/distance-option`,
						action: () => {
							return page.evaluate(() => {
								pio.create('free', {
									target: '.test-box',
									pointerElement: '.pointer-img',
									distance: 80
								})
							})
						},
						pwPage: page,
						pwTestInfo: testInfo
					})
				})

				it('separates the arrow from center in same direction of fromAngle option', async ({
					page
				}, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}/free`,
						expectedURL: `/${xW}x${xH}/free/distance-option/148`,
						action: () => {
							return page.evaluate(() => {
								pio.create('free', {
									target: '.test-box',
									pointerElement: '.pointer-img',
									distance: 80,
									fromAngle: 148
								})
							})
						},
						pwPage: page,
						pwTestInfo: testInfo
					})
				})

				it('takes into account the transformOrigin option', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}/free`,
						expectedURL: `/${xW}x${xH}/free/distance-option/with-transform-origin`,
						action: () => {
							return page.evaluate(() => {
								pio.create('free', {
									target: '.test-box',
									pointerElement: '.pointer-img',
									transformOrigin: 'right',
									distance: 80
								})
							})
						},
						pwPage: page,
						pwTestInfo: testInfo
					})
				})
			})

			test.describe(`transformOrigin (${xW}x${xH})`, () => {
				it('defines the tip of the pointer', async ({ page }, testInfo) => {
					await visualComparisonBetweenPages({
						testingURL: `/${xW}x${xH}/free`,
						expectedURL: `/${xW}x${xH}/free/transform-origin-option`,
						action: () => {
							return page.evaluate(
								({ xW, xH }) => {
									pio.create('free', {
										target: `.test-box--${xW}x${xH}`,
										pointerElement: '.pointer-img',
										transformOrigin: 'right'
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
	})
})
