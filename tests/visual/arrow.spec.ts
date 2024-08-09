import { test, test as it } from '@playwright/test'
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
})
