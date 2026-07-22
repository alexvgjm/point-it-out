import { test, test as it } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'

test.describe('create(\'dot\')', () => {
	const testsTargets = [{ xW: 300, xH: 300 }]

	test.describe('Default behavior (no options)', () => {
		testsTargets.forEach(({ xW, xH }) => {
			it(`creates an orange dot centered on the target (${xW}x${xH})`, async ({ page }, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/${xW}x${xH}`,
					expectedURL: `/${xW}x${xH}/dot/default`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) => {
								pio.create('dot', {
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
			test(`strokeWidth, strokeColor & fillColor (${xW}x${xH})`, async ({ page }, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/${xW}x${xH}`,
					expectedURL: `/${xW}x${xH}/dot/stroke-width-color-options`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) =>
								pio.create('dot', {
									target: `.test-box--${xW}x${xH}`,
									strokeWidth: 8,
									strokeColor: 'darkgreen',
									fillColor: 'limegreen'
								}),
							{ xW, xH }
						)
					},
					pwPage: page,
					pwTestInfo: testInfo
				})
			})

			test(`radius option (${xW}x${xH})`, async ({ page }, testInfo) => {
				await visualComparisonBetweenPages({
					testingURL: `/${xW}x${xH}`,
					expectedURL: `/${xW}x${xH}/dot/radius-option`,
					action: () => {
						return page.evaluate(
							({ xW, xH }) =>
								pio.create('dot', {
									target: `.test-box--${xW}x${xH}`,
									radius: 26
								}),
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