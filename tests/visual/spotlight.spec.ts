import { test, expect } from '@playwright/test'
import * as pio from '../../src/lib/main'

test.describe("create('spotlight')", () => {
  const testsTargets = [{ xW: 300, xH: 300 }]

  testsTargets.forEach(({ xW, xH }) => {
    test(`creates a spotlight overlay over target (${xW}x${xH})`, async ({ page }) => {
      await page.goto(`/${xW}x${xH}`, { waitUntil: 'networkidle' })

      await page.evaluate(
        ({ xW, xH }) => {
          pio.create('spotlight', {
            target: `.test-box--${xW}x${xH}`
          })
        },
        { xW, xH }
      )

      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot(`spotlight-default-${xW}x${xH}.png`)
    })

    test(`spotlight with custom overlayColor (${xW}x${xH})`, async ({ page }) => {
      await page.goto(`/${xW}x${xH}`, { waitUntil: 'networkidle' })

      await page.evaluate(() => {
        pio.create('spotlight', {
          target: `.test-box`,
          overlayColor: 'rgba(0, 0, 139, 0.5)'
        })
      })

      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot(`spotlight-overlay-color-${xW}x${xH}.png`)
    })

    test(`spotlight with padding (${xW}x${xH})`, async ({ page }) => {
      await page.goto(`/${xW}x${xH}`, { waitUntil: 'networkidle' })

      await page.evaluate(() => {
        pio.create('spotlight', {
          target: `.test-box`,
          padding: 20
        })
      })

      await page.waitForTimeout(500)
      await expect(page).toHaveScreenshot(`spotlight-padding-${xW}x${xH}.png`)
    })
  })
})
