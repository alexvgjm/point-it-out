import { test, test as it, expect, Page } from "@playwright/test";
import { visualComparisonBetweenPages } from "./test-utils";
import * as pio from "../../src/main";

test.describe("create('square')", () => {
    const testsTargets = [
        { expectedWidth: 300, expectedHeight: 300 },
        { expectedWidth: 400, expectedHeight: 250 }
    ]

    testsTargets.forEach(({ expectedWidth, expectedHeight }, idx) => {
        it("creates an SVG of approximately same width and height of target's"
            + ` rect (${expectedWidth}x${expectedHeight})`, async ({ page }) => {

                await page.goto(`/${expectedWidth}x${expectedHeight}`)

                const createdSVGRect = await page.evaluate(({ expectedWidth, expectedHeight, idx }) => {
                        const selector = `.test-box--${expectedWidth}x${expectedHeight}`
                        pio.create('square', { target: selector, className: `result${idx}` })

                        const elm = document.querySelector(`.result${idx}`)
                        return elm?.getBoundingClientRect()
                    }, { expectedWidth, expectedHeight, idx }
                )

                expect(Math.abs(createdSVGRect.width - expectedWidth)).toBeLessThanOrEqual(8)
                expect(Math.abs(createdSVGRect.height - expectedHeight)).toBeLessThanOrEqual(8)
            })

        it(`creates an SVG absolutely positioned over target (${expectedWidth}x${expectedHeight})`, async ({ page }) => {
            await page.goto(`/${expectedWidth}x${expectedHeight}`)
            await page.waitForLoadState('load')
            const selector = `.test-box--${expectedWidth}x${expectedHeight}`

            const [targetRect, createdSVGRect] = await page.evaluate(
                ({ selector, idx }) => {
                    pio.create('square', { target: selector, className: `result${idx}` })
                    const tgt = document.querySelector(selector)
                    const elm = document.querySelector(`.result${idx}`)
                    return [tgt?.getBoundingClientRect(),
                    elm?.getBoundingClientRect()]

                }, { selector, idx }
            )

            expect(Math.abs(targetRect?.left - createdSVGRect?.left)).toBeLessThanOrEqual(8)
            expect(Math.abs(targetRect?.top - createdSVGRect?.top)).toBeLessThanOrEqual(8)
        })

        test(`created square follow target element on resize (${expectedWidth}x${expectedHeight})`, async ({page}, testInfo)=>{
            await visualComparisonBetweenPages({
                testingURL: `/${expectedWidth}x${expectedHeight}`,
                expectedURL: `/expected/square/${expectedWidth}x${expectedHeight}-default`,

                beforeExpectedScreenshot: 
                    async () => await page.setViewportSize({width: 600, height: 600}),

                beforeAction: 
                    async () => await page.setViewportSize({width: 1280, height: 768}),

                action: async () => {
                    await page.evaluate(({ expectedWidth, expectedHeight }) => pio.create('square', {
                        target: `.test-box--${expectedWidth}x${expectedHeight}`,
                        className: `result`,
                    }), { expectedWidth, expectedHeight })
                },

                beforeActionScreenshot: 
                    async () => await page.setViewportSize({width: 600, height: 600}),

                pwPage: page,
                pwTestInfo: testInfo,
            })
        })
        test(`created SVG should ignore pointer events and let pass through it (${expectedWidth}x${expectedHeight})`, async ({page}, testInfo)=>{
            await page.goto(`/${expectedWidth}x${expectedHeight}`)
            await page.waitForLoadState('load')
            const selector = `.test-box--${expectedWidth}x${expectedHeight}`

            const targetRect = await page.evaluate(
                ({ selector, idx }) => {
                    pio.create('square', { target: selector, className: `result${idx}` })
                    const tgt = document.querySelector(selector)
                    // Remove target on click on it for testing
                    tgt!.addEventListener('click', () => tgt!.remove())
                    return tgt?.getBoundingClientRect()
                }, { selector, idx }
            ) as DOMRect

            await page.mouse.click(
                targetRect.left + targetRect.width/2,
                targetRect.top + targetRect.height/2
            )

            await expect(page.locator(selector)).not.toBeAttached()
        })
    })


    test.describe('Default behavior (no options)', () => {
        testsTargets.forEach(({ expectedWidth, expectedHeight }, idx) => {
            it(`creates an orange rect with a width of 4px around target (${expectedWidth}x${expectedHeight})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${expectedWidth}x${expectedHeight}`,
                    expectedURL: `/expected/square/${expectedWidth}x${expectedHeight}-default`,
                    action: () => {
                        return page.evaluate(({ expectedWidth, expectedHeight }) => pio.create('square', {
                            target: `.test-box--${expectedWidth}x${expectedHeight}`,
                            className: `result`
                        }), { expectedWidth, expectedHeight })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })
        })
    })

    test.describe('Options', () => {
        testsTargets.forEach(({ expectedWidth, expectedHeight }, idx) => {
            test(`strokeWidth & color (${expectedWidth}x${expectedHeight})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${expectedWidth}x${expectedHeight}`,
                    expectedURL: `/expected/square/${expectedWidth}x${expectedHeight}-stroke-width-color-options`,
                    action: () => {
                        return page.evaluate(({ expectedWidth, expectedHeight }) => pio.create('square', {
                            target: `.test-box--${expectedWidth}x${expectedHeight}`,
                            className: `result`,
                            strokeWidth: 8,
                            strokeColor: 'limegreen'
                        }), { expectedWidth, expectedHeight })
                    },
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })

        })


    })
})
