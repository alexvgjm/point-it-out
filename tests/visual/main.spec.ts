import { test, test as it, expect } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'
import type { PointerOptions } from '$lib/types'

test.describe('System options', () => {
  const pointers = ['arrow', 'rect'] as (keyof PointerOptions)[]

  pointers.forEach((p) => {
    test.describe(`[${p}] updateOnResize`, () => {
      it("created SVG doesn't follow target when resize if updateOnResize is false", async ({
        page
      }, testInfo) => {
        await visualComparisonBetweenPages({
          testingURL: `/300x300`,
          expectedURL: `/300x300/${p}/default`,
          not: true,

          beforeExpectedScreenshot: async () =>
            await page.setViewportSize({ width: 600, height: 600 }),

          beforeAction: async () => await page.setViewportSize({ width: 1280, height: 768 }),

          action: async () => {
            await page.evaluate((p) => {
              pio.config({ updateOnResize: false })

              pio.create(p, {
                target: `.test-box`,
                className: `result`
              })
            }, p)
          },

          beforeActionScreenshot: async () =>
            await page.setViewportSize({ width: 600, height: 600 }),

          pwPage: page,
          pwTestInfo: testInfo
        })
      })

      it('created SVG follows target when resize if updateOnResize is true', async ({
        page
      }, testInfo) => {
        await visualComparisonBetweenPages({
          testingURL: `/300x300`,
          expectedURL: `/300x300/${p}/default`,

          beforeExpectedScreenshot: async () =>
            await page.setViewportSize({ width: 600, height: 600 }),

          beforeAction: async () => await page.setViewportSize({ width: 1280, height: 768 }),

          action: async () => {
            await page.evaluate((p) => {
              pio.config({ updateOnResize: true })
              pio.create(p, {
                target: `.test-box`,
                className: `result`
              })
            }, p)
          },

          beforeActionScreenshot: async () =>
            await page.setViewportSize({ width: 600, height: 600 }),

          pwPage: page,
          pwTestInfo: testInfo
        })
      })
    })
  })
})

test.describe('Common options', () => {
  test.describe('container option', () => {
    it('creates the pointer inside the container', async ({ page }, testInfo) => {
      await visualComparisonBetweenPages({
        testingURL: `/300x300/rect/scroll`,
        expectedURL: `/300x300/rect/scroll/container-option`,

        action: async () => {
          await page.evaluate(() => {
            pio.config({ updateOnResize: false })

            pio.create('rect', {
              target: `.test-box`,
              className: `result`,
              container: '.test-box'
            })
          })
        },

        pwPage: page,
        pwTestInfo: testInfo
      })
    })

    it('sets position: relative if container is static', async ({ page }) => {
      await page.goto('/300x300/issues/static-container', { waitUntil: 'networkidle' })
      const position = await page.evaluate(() => {
        pio.create('rect', { target: `.test-box` })
        const elm = document.querySelector('.visual-test')!
        return Promise.resolve(getComputedStyle(elm).position)
      })

      expect(position).toBe('relative')
    })
  })
})
