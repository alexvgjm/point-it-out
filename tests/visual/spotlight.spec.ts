import { test } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'

test.describe("create('spotlight')", () => {
  const testsTargets = [
    { xW: 300, xH: 300 },
    { xW: 400, xH: 250 }
  ]

  testsTargets.forEach(({ xW, xH }) => {
    test(`creates a spotlight overlay over target (${xW}x${xH})`, async ({ page }, testInfo) => {
      await visualComparisonBetweenPages({
        testingURL: `/${xW}x${xH}/spotlight-base`,
        expectedURL: `/${xW}x${xH}/spotlight/default`,

        action: async () => {
          await page.evaluate(
            ({ xW, xH }) => {
              pio.create('spotlight', {
                target: `.test-box--${xW}x${xH}`,
                className: `result`
              })
            },
            { xW, xH }
          )
        },

        pwPage: page,
        pwTestInfo: testInfo
      })
    })

    test(`spotlight with custom overlayColor (${xW}x${xH})`, async ({ page }, testInfo) => {
      await visualComparisonBetweenPages({
        testingURL: `/${xW}x${xH}/spotlight-base`,
        expectedURL: `/${xW}x${xH}/spotlight/overlay-color-option`,

        action: async () => {
          await page.evaluate(() => {
            pio.create('spotlight', {
              target: `.test-box`,
              overlayColor: 'rgba(0, 0, 139, 0.5)',
              className: `result`
            })
          })
        },

        pwPage: page,
        pwTestInfo: testInfo
      })
    })

    test(`spotlight with padding (${xW}x${xH})`, async ({ page }, testInfo) => {
      await visualComparisonBetweenPages({
        testingURL: `/${xW}x${xH}/spotlight-base`,
        expectedURL: `/${xW}x${xH}/spotlight/padding-option`,

        action: async () => {
          await page.evaluate(() => {
            pio.create('spotlight', {
              target: `.test-box`,
              padding: 20,
              className: `result`
            })
          })
        },

        pwPage: page,
        pwTestInfo: testInfo
      })
    })
  })
})
