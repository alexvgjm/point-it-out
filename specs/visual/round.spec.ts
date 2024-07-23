import { test, test as it, expect, Page } from "@playwright/test";
import { visualComparisonBetweenPages } from "./test-utils";
import * as pio from "../../src/main";

test.describe("create('round')", () => {
    const testsTargets = [
        { expectW: 300, expectH: 300 },
        { expectW: 400, expectH: 250 }
    ]

    test.describe('Default behavior (no options)', () => {
        testsTargets.forEach(({ expectW, expectH }, idx) => {
            it(`creates an orange ellipse with a width of 4px around target (${expectW}x${expectH})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${expectW}x${expectH}`,
                    expectedURL: `/expected/round/${expectW}x${expectH}-default`,
                    action: () => {
                        return page.evaluate(({ expectW, expectH }) => pio.create('round', {
                            target: `.test-box--${expectW}x${expectH}`,
                            className: `result`
                        }), { expectW, expectH })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })
        })
    })

    test.describe('Options', () => {
        testsTargets.forEach(({ expectW, expectH }, idx) => {
            test(`strokeWidth & color (${expectW}x${expectH})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${expectW}x${expectH}`,
                    expectedURL: `/expected/round/${expectW}x${expectH}-stroke-width-color-options`,
                    action: () => {
                        return page.evaluate(({ expectW, expectH }) => pio.create('round', {
                            target: `.test-box--${expectW}x${expectH}`,
                            className: `result`,
                            strokeWidth: 8,
                            strokeColor: 'limegreen'
                        }), { expectW, expectH })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })
        })
    })
})
