import { test, test as it, expect, Page } from "@playwright/test";
import { visualComparisonBetweenPages } from "./test-utils";
import * as pio from "../../src/main";

test.describe('System options', ()=> {
    test.describe("updateOnResize", () => {
        it("created SVG doesn't follow target when resize if updateOnResize is false", 
            async ({ page }, testInfo) => {
                await visualComparisonBetweenPages({
                    testingURL: `/300x300`,
                    expectedURL: `/expected/square/300x300-default`,
                    not: true,
    
                    beforeExpectedScreenshot: 
                        async () => await page.setViewportSize({width: 600, height: 600}),
    
                    beforeAction: 
                        async () => await page.setViewportSize({width: 1280, height: 768}),
    
                    action: async () => {
                        await page.evaluate(() => {
                            pio.config({updateOnResize: false})
    
                            pio.create('square', {
                                target: `.test-box`,
                                className: `result`,
                            })
                        })
                    },
    
                    beforeActionScreenshot: 
                        async () => await page.setViewportSize({width: 600, height: 600}),
    
                    pwPage: page,
                    pwTestInfo: testInfo,
                })
            })
    })
})