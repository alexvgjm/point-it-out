import { test } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'

test.describe('Visual Tests: Spotlight Pulse Animation', () => {

	test('spotlight pulse is visually different from default at 300x300', async ({ page }, testInfo) => {
		await visualComparisonBetweenPages({
			pwPage: page,
			pwTestInfo: testInfo,
			expectedURL: '/300x300/spotlight/default',
			testingURL: '/300x300/spotlight-pulse',
			beforeActionScreenshot: () => page.waitForTimeout(700),
			not: true
		})
	})

	test('spotlight pulse is visually different from default at 400x250', async ({ page }, testInfo) => {
		await visualComparisonBetweenPages({
			pwPage: page,
			pwTestInfo: testInfo,
			expectedURL: '/400x250/spotlight/default',
			testingURL: '/400x250/spotlight-pulse',
			beforeActionScreenshot: () => page.waitForTimeout(700),
			not: true
		})
	})

})