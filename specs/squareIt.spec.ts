import { test, test as it, expect } from "@playwright/test";
import { squareIt } from "../src/core";
import { testCommonBehavior } from "./common-behaviors";

testCommonBehavior('squareIt')

test.describe('squareIt() related', ()=>{
    const testsTargets = [ 
        {expectedWidth: 300,  expectedHeight: 300, color: '#fea'}, 
        {expectedWidth: 400,  expectedHeight: 250, color: '#cae'},
        {expectedWidth: 1000, expectedHeight: 1000, color: "#bea"}
    ]

    testsTargets.forEach(({expectedWidth, expectedHeight}, idx) => {
        let selector: string
        test.beforeEach(async ({page})=> {
            await page.goto('/')
            selector = `.test-box--${expectedWidth}x${expectedHeight}`
        })

        it("creates an SVG of approximately same width and height of target's" 
         + `rect (${expectedWidth}x${expectedHeight})`, async ({page})=>{

            const createdSVGRect = await page.evaluate(
                ({expectedWidth, expectedHeight, idx}) => { 
                    squareIt(
                        {target: `.test-box--${expectedWidth}x${expectedHeight}`, 
                        className: `result${idx}`
                    })

                    const elm = document.querySelector(`.result${idx}`)
                    return elm?.getBoundingClientRect()
                }, {expectedWidth, expectedHeight, idx}
            )

            expect(Math.abs(createdSVGRect.width  - expectedWidth)).toBeLessThanOrEqual(8)
            expect(Math.abs(createdSVGRect.height - expectedHeight)).toBeLessThanOrEqual(8)
        })

        it(`creates an SVG absolutely positioned over target (${expectedWidth}x${expectedHeight})`, async ({page})=>{
               const [targetRect, createdSVGRect] = await page.evaluate(
                   ({selector, idx}) => {
                        squareIt({target: selector, className: `result${idx}`})
                        const tgt = document.querySelector(selector)
                        const elm = document.querySelector(`.result${idx}`)
                        return [ tgt?.getBoundingClientRect(), 
                                 elm?.getBoundingClientRect()]

                   }, {selector, idx}
               )
               
               expect(Math.abs(targetRect?.left - createdSVGRect?.left)).toBeLessThanOrEqual(8)
               expect(Math.abs(targetRect?.top - createdSVGRect?.top)).toBeLessThanOrEqual(8)
        })
    })
})