import { test } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'

test.describe('Pruebas Visuales: Animación Spotlight Pulse', () => {

	// expectedURL → /spotlight/default muestra el overlay estático con fondo oscuro + texto
	// testingURL  → /spotlight-pulse muestra el overlay con el hueco ANIMANDO (pulse)
	// not: true   → verificamos que el pulso crea diferencia visual respecto al estado estático

	test('spotlight pulse es visualmente diferente al default en 300x300', async ({ page }, testInfo) => {
		await visualComparisonBetweenPages({
			pwPage: page,
			pwTestInfo: testInfo,
			expectedURL: '/300x300/spotlight/default',
			testingURL: '/300x300/spotlight-pulse',
			beforeActionScreenshot: () => page.waitForTimeout(700),
			not: true
		})
	})

	test('spotlight pulse es visualmente diferente al default en 400x250', async ({ page }, testInfo) => {
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
