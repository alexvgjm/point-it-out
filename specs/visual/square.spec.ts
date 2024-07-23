import { test, test as it, expect, Page } from "@playwright/test";
import { visualComparisonBetweenPages } from "./test-utils";
import * as pio from "../../src/main";

test.describe("create('square')", () => {
    const testsTargets = [
        { xW: 300, xH: 300 },
        { xW: 400, xH: 250 }
    ]

    testsTargets.forEach(({ xW, xH }, idx) => {
        it("creates an SVG of approximately same width and height of target's"
            + ` rect (${xW}x${xH})`, async ({ page }) => {

                await page.goto(`/${xW}x${xH}`)

                const createdSVGRect = await page.evaluate(({ xW, xH, idx }) => {
                        const selector = `.test-box--${xW}x${xH}`
                        pio.create('square', { target: selector, className: `result${idx}` })

                        const elm = document.querySelector(`.result${idx}`)
                        return elm?.getBoundingClientRect()
                    }, { xW, xH, idx }
                )

                expect(Math.abs(createdSVGRect.width - xW)).toBeLessThanOrEqual(8)
                expect(Math.abs(createdSVGRect.height - xH)).toBeLessThanOrEqual(8)
            })

        it(`creates an SVG absolutely positioned over target (${xW}x${xH})`, async ({ page }) => {
            await page.goto(`/${xW}x${xH}`)
            await page.waitForLoadState('load')
            const selector = `.test-box--${xW}x${xH}`

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

        test(`created square follow target element on resize (${xW}x${xH})`, async ({page}, testInfo)=>{
            await visualComparisonBetweenPages({
                testingURL: `/${xW}x${xH}`,
                expectedURL: `/expected/square/${xW}x${xH}-default`,

                beforeExpectedScreenshot: 
                    async () => await page.setViewportSize({width: 600, height: 600}),

                beforeAction: 
                    async () => await page.setViewportSize({width: 1280, height: 768}),

                action: async () => {
                    await page.evaluate(({ xW, xH }) => pio.create('square', {
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
        test(`created SVG should ignore pointer events and let pass through it (${xW}x${xH})`, async ({page}, testInfo)=>{
            await page.goto(`/${xW}x${xH}`)
            await page.waitForLoadState('load')
            const selector = `.test-box--${xW}x${xH}`

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
        testsTargets.forEach(({ xW, xH }, idx) => {
            it(`creates an orange rect with a width of 4px around target (${xW}x${xH})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${xW}x${xH}`,
                    expectedURL: `/expected/square/${xW}x${xH}-default`,
                    action: () => {
                        return page.evaluate(({ xW, xH }) => pio.create('square', {
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
                    expectedURL: `/expected/square/${xW}x${xH}-stroke-width-color-options`,
                    action: () => {
                        return page.evaluate(({ xW, xH }) => pio.create('square', {
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
                    expectedURL: `/expected/square/${xW}x${xH}-padding-option`,
                    action: () => {
                        return page.evaluate(({ xW, xH }) => pio.create('square', {
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
