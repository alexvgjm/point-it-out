import { test, test as it } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'

test.describe("create('free')", () => {
  const testsTargets = [{ xW: 300, xH: 300 }]

  test.describe('Default behavior (no options)', () => {
    testsTargets.forEach(({ xW, xH }) => {
      it(`it uses the left-center as pointer tip by default and rotate 45degs`, async ({
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

      test.only('using a div element', async ({ page }, testInfo) => {
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
