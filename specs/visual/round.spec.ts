import { test, test as it, expect, Page } from "@playwright/test";
import { visualComparisonBetweenPages } from "./test-utils";
import * as pio from "../../src/main";

test.describe("create('round')", () => {
    const testsTargets = [
        { xW: 300, xH: 300 },
        { xW: 400, xH: 250 }
    ]

    testsTargets.forEach(({ xW, xH }, idx) => {
        test(`created SVG follow target element on resize (${xW}x${xH})`, async ({page}, testInfo)=>{
            await visualComparisonBetweenPages({
                testingURL: `/${xW}x${xH}`,
                expectedURL: `/expected/round/${xW}x${xH}-default`,

                beforeExpectedScreenshot: 
                    async () => await page.setViewportSize({width: 600, height: 600}),

                beforeAction: 
                    async () => await page.setViewportSize({width: 1280, height: 768}),

                action: async () => {
                    await page.evaluate(({ xW, xH }) => pio.create('round', {
                        target: `.test-box--${xW}x${xH}`,
                        className: `result`,
                    }), { xW, xH })
                },

                beforeActionScreenshot: 
                    async () => await page.setViewportSize({width: 600, height: 600}),

                pwPage: page,
                pwTestInfo: testInfo,
            })
        })
    })

    test.describe('Default behavior (no options)', () => {
        testsTargets.forEach(({ xW, xH }, idx) => {
            it(`creates an orange ellipse with a width of 4px around target (${xW}x${xH})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${xW}x${xH}`,
                    expectedURL: `/expected/round/${xW}x${xH}-default`,
                    action: () => {
                        return page.evaluate(({ xW, xH }) => pio.create('round', {
                            target: `.test-box--${xW}x${xH}`,
                            className: `result`
                        }), { xW, xH })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })
        })
    })

    test.describe('Options', () => {
        testsTargets.forEach(({ xW, xH }, idx) => {
            test(`strokeWidth & color (${xW}x${xH})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${xW}x${xH}`,
                    expectedURL: `/expected/round/${xW}x${xH}-stroke-width-color-options`,
                    action: () => {
                        return page.evaluate(({ xW, xH }) => pio.create('round', {
                            target: `.test-box--${xW}x${xH}`,
                            className: `result`,
                            strokeWidth: 8,
                            strokeColor: 'limegreen'
                        }), { xW, xH })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })

            test(`padding (${xW}x${xH})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${xW}x${xH}`,
                    expectedURL: `/expected/round/${xW}x${xH}-padding-option`,
                    action: () => {
                        return page.evaluate(({ xW, xH }) => pio.create('round', {
                            target: `.test-box--${xW}x${xH}`,
                            className: `result`,
                            padding: 16
                        }), { xW, xH })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })
        })
    })
})
