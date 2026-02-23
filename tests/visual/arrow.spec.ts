import { test, test as it, expect, type Page } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'

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
                      scale: sizeName
                    })
                  },
                  { sizeName: sizeName as pio.NamedScale }
                )
              },
              pwPage: page,
              pwTestInfo: testInfo
            })
          })
        })
      })

      test.describe(`responsive (${xW}x${xH})`, { tag: '@responsive' }, () => {
        async function expectArrowInsideContainer(page: Page, tolerance = 10, negate = false) {
          const container = await page.getByTestId('limited-container').boundingBox()
          const arrow = await page.locator('.test-arrow svg').boundingBox()
          const cx = container!.x + container!.width
          const ax = arrow!.x + arrow!.width

          if (negate) {
            expect(ax).toBeGreaterThan(cx + tolerance)
          } else {
            expect(ax).toBeLessThanOrEqual(cx + tolerance)
          }
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
              scale: 1.75
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
              scale: 1.75
            })
          })
          await expectArrowInsideContainer(page)
        })

        it(`scale to fit if responsive until 'scale'`, async ({ page }) => {
          await page.goto(testingURL, { waitUntil: 'networkidle' })
          await page.evaluate(() => {
            pio.create('arrow', {
              target: `.test-box`,
              className: 'test-arrow',
              container: '.limited-container',
              responsive: {
                type: 'scale',
                minScale: 2
              },
              scale: 2.5
            })
          })
          await expectArrowInsideContainer(page, 10, true)
        })
      })

      test.describe(`custom shape (${xW}x${xH})`, () => {
        it('renders a custom parametric shape (long needle)', async ({ page }, testInfo) => {
          const customShape = {
            tailWidth: 4,
            tailLength: 150,
            headWidth: 30,
            headLength: 60
          }

          await visualComparisonBetweenPages({
            testingURL: `/${xW}x${xH}`,
            expectedURL: `/${xW}x${xH}/arrow/custom-shape`,
            action: () => {
              return page.evaluate((shapeData) => {
                // @ts-expect-error: pio is attached to window in the browser context
                window.pio.create('arrow', {
                  target: `.test-box`,
                  shape: shapeData
                })
              }, customShape)
            },
            pwPage: page,
            pwTestInfo: testInfo
          })
        })
      })
    })
  })
})
