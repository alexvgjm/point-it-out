import { test, test as it } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'

test.describe('create(\'link\')', () => {
	const xW = 300, xH = 300
	const TEST_COLOR = '#ffa500'

	it('renders an identical link using base boxes', async ({ page }, testInfo) => {
		await visualComparisonBetweenPages({
			testingURL: `/${xW}x${xH}/link`,
			expectedURL: `/${xW}x${xH}/link/default`,
			pwPage: page,
			pwTestInfo: testInfo,
			action: () => page.evaluate((color) => {
				window.pio.create('link', {
					from: '#origin-box',
					target: '#target-box',
					strokeColor: color,
					strokeWidth: 2
				})
			}, TEST_COLOR)
		})
	})

	it('renders an identical dashed link', async ({ page }, testInfo) => {
		await visualComparisonBetweenPages({
			testingURL: `/${xW}x${xH}/link`,
			expectedURL: `/${xW}x${xH}/link/dashed`,
			pwPage: page,
			pwTestInfo: testInfo,
			action: () => page.evaluate((color) => {
				window.pio.create('link', {
					from: '#origin-box',
					target: '#target-box',
					strokeColor: color,
					strokeWidth: 2,
					type: 'dashed',
					dashArray: '5 5'
				})
			}, TEST_COLOR)
		})
	})
})