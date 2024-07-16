import { test, test as it, expect, Page, TestInfo } from "@playwright/test";
import { squareIt } from "../src/core";
import { testCommonBehavior } from "./common-behaviors";
import { visualComparisonBetweenPages } from "./test-utils";
const describe = test.describe

describe('squareIt()', () => {
    testCommonBehavior('squareIt')

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

    it(`creates a rect element inside the SVG`, async ({ page }) => {
        await page.goto('/300x300')
        await page.evaluate(() => squareIt({
            target: `.test-box--300x300`,
            className: `result`
        }))

        await expect(page.locator('.result rect')).toBeAttached()
    })

    describe('Default behavior (no options)', () => {
        it(`creates an orange rect with a width of 4px around target`, async ({ page }, testInfo) => {
            await visualComparisonBetweenPages({
                testingURL: '/300x300',
                expectedURL: '/expected/squareit/300x300-default',
                action: () => {
                    return page.evaluate(() => squareIt({
                        target: `.test-box--300x300`,
                        className: `result`
                    }))
                },
                pwPage: page,
                pwTestInfo: testInfo,
            })
        })
    })
})