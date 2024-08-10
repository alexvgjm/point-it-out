import { test, test as it } from '@playwright/test'
import { visualComparisonBetweenPages } from './test-utils'
import * as pio from '../../src/lib/main'
import { originStringToAngleMap } from '$lib/shapes/utils'
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

        Object.entries(originStringToAngleMap).forEach(([angleString, angle]) => {
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
    })
  })
})
