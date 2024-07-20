import { test, test as it, expect } from "@playwright/test";
import { squareIt } from "../../src/core";
import { visualComparisonBetweenPages } from "./test-utils";

test.describe('squareIt()', () => {
    const testsTargets = [
        { expectedWidth: 300, expectedHeight: 300, color: '#fea' },
        { expectedWidth: 400, expectedHeight: 250, color: '#cae' }
    ]

    testsTargets.forEach(({ expectedWidth, expectedHeight }, idx) => {
        it("creates an SVG of approximately same width and height of target's"
            + `rect (${expectedWidth}x${expectedHeight})`, async ({ page }) => {

            await page.goto(`/${expectedWidth}x${expectedHeight}`)
            const selector = `.test-box--${expectedWidth}x${expectedHeight}`

            const createdSVGRect = await page.evaluate(
                ({ expectedWidth, expectedHeight, idx }) => {
                    console.log("IDX: ", idx)
                    squareIt(
                        {
                            target: `.test-box--${expectedWidth}x${expectedHeight}`,
                            className: `result${idx}`
                        })

                    const elm = document.querySelector(`.result${idx}`)
                    return elm?.getBoundingClientRect()
                }, { expectedWidth, expectedHeight, idx }
            )

            expect(Math.abs(createdSVGRect.width - expectedWidth)).toBeLessThanOrEqual(8)
            expect(Math.abs(createdSVGRect.height - expectedHeight)).toBeLessThanOrEqual(8)
        })

        it(`creates an SVG absolutely positioned over target (${expectedWidth}x${expectedHeight})`, async ({ page }) => {
            await page.goto(`/${expectedWidth}x${expectedHeight}`)
            const selector = `.test-box--${expectedWidth}x${expectedHeight}`

            const [targetRect, createdSVGRect] = await page.evaluate(
                ({ selector, idx }) => {
                    squareIt({ target: selector, className: `result${idx}` })
                    const tgt = document.querySelector(selector)
                    const elm = document.querySelector(`.result${idx}`)
                    return [tgt?.getBoundingClientRect(),
                    elm?.getBoundingClientRect()]

                }, { selector, idx }
            )

            expect(Math.abs(targetRect?.left - createdSVGRect?.left)).toBeLessThanOrEqual(8)
            expect(Math.abs(targetRect?.top - createdSVGRect?.top)).toBeLessThanOrEqual(8)
        })
    })

    
    test.describe('Default behavior (no options)', () => {
        testsTargets.forEach(({ expectedWidth, expectedHeight }, idx) => {
            it(`creates an orange rect with a width of 4px around target (${expectedWidth}x${expectedHeight})`, async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/${expectedWidth}x${expectedHeight}`,
                    expectedURL: `/expected/squareit/${expectedWidth}x${expectedHeight}-default`,
                    action: () => {
                        return page.evaluate(({ expectedWidth, expectedHeight }) => squareIt({
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
            test(`strokeWidth & color (${expectedWidth}x${expectedHeight})`, async ({page}, testInfo)=>{
                await visualComparisonBetweenPages({
                    testingURL: `/${expectedWidth}x${expectedHeight}`,
                    expectedURL: `/expected/squareit/${expectedWidth}x${expectedHeight}-strokeWidth-and-color-options`,
                    action: () => {
                        return page.evaluate(({ expectedWidth, expectedHeight }) => squareIt({
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
