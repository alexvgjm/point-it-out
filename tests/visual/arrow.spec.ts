import { test, test as it, expect, type Page } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'
import { originToAngle } from '$lib/values'
import type { Origin } from '$lib/types'

test.describe("create('arrow')", () => {
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
      test.describe(`fromAngle (${xW}x${xH})`, () => {
        it('rotates the arrow from its tip to match specified angle', async ({
          page
        }, testInfo) => {
          await visualComparisonBetweenPages({
            testingURL: `/${xW}x${xH}`,
            expectedURL: `/${xW}x${xH}/arrow/from-option/60`,
            action: () => {
              return page.evaluate(() => {
                pio.create('arrow', {
                  target: `.test-box`,
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
              expectedURL: `/${xW}x${xH}/arrow/from-option/${angle}`,
              action: () => {
                return page.evaluate(
                  ({ angleString }) => {
                    pio.create('arrow', {
                      target: `.test-box`,
                      fromAngle: angleString as Origin
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
                  target: `.test-box`,
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
                  target: `.test-box`,
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

      test.describe(`distance (${xW}x${xH})`, () => {
        it('separates the created arrow a number of pixels from center', async ({
          page
        }, testInfo) => {
          await visualComparisonBetweenPages({
            testingURL: `/${xW}x${xH}`,
            expectedURL: `/${xW}x${xH}/arrow/distance-option`,
            action: () => {
              return page.evaluate(() => {
                pio.create('arrow', {
                  target: `.test-box`,
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
            testingURL: `/${xW}x${xH}`,
            expectedURL: `/${xW}x${xH}/arrow/distance-option/148`,
            action: () => {
              return page.evaluate(() => {
                pio.create('arrow', {
                  target: `.test-box`,
                  distance: 80,
                  fromAngle: 148
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
                      target: `.test-box`,
                      size: sizeName
                    })
                  },
                  { sizeName: sizeName as pio.NamedSize }
                )
              },
              pwPage: page,
              pwTestInfo: testInfo
            })
          })
        })
      })

      test.describe(`responsive (${xW}x${xH})`, { tag: '@responsive' }, () => {
        async function expectArrowInsideContainer(page: Page, tolerance = 10) {
          const container = await page.getByTestId('limited-container').boundingBox()
          const arrow = await page.locator('.test-arrow').boundingBox()
          const cx = container!.x + container!.width
          const ax = arrow!.x + arrow!.width
          expect(ax).toBeLessThanOrEqual(cx + tolerance)
        }

        const testingURL = `/${xW}x${xH}/arrow/responsive-option`

        it(`rotates to fit if responsive: 'rotate'`, async ({ page }) => {
          await page.goto(testingURL, { waitUntil: 'networkidle' })
          await page.evaluate(() => {
            pio.create('arrow', {
              target: `.test-box`,
              className: 'test-arrow',
              container: '.limited-container',
              responsive: 'rotate',
              size: 1.75
            })
          })
          await expectArrowInsideContainer(page)
        })

        it(`scale to fit if responsive: 'scale'`, async ({ page }) => {
          await page.goto(testingURL, { waitUntil: 'networkidle' })
          await page.evaluate(() => {
            pio.create('arrow', {
              target: `.test-box`,
              className: 'test-arrow',
              container: '.limited-container',
              responsive: 'scale',
              size: 1.75
            })
          })
          await expectArrowInsideContainer(page)
        })
      })
    })
  })
})
