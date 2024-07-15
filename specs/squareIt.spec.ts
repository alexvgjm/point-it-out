import { test, test as it, expect } from "@playwright/test";
import { squareIt } from "../src/core";
import { expectCreatedSVGElementAsBodyChild, 
         expectCreatedSVGElementContainsClass } from "./common-asserts";

test.describe('Common asserts', ()=>{
    test.describe('Happy', async () => {
        it('creates an SVG with specified class and append it to body', async ({ page })=>{
            await page.goto('/');
            page.evaluate(()=>{ squareIt({target: 'test-text', className: 'test-class'}) })
            await expectCreatedSVGElementAsBodyChild(page)
            await expectCreatedSVGElementContainsClass(page, 'test-class')
        })
    });

    test('Unhappy', async ({ page }) => {
        it(`does nothing if selector doesn't match anything`, async ()=>{
            await page.goto('/');
            page.evaluate(()=>{ squareIt({target: '.asdasdas'}) })
            await expect(page.locator('svg')).not.toBeAttached()
        })
    });
})

test.describe('squareIt() specifics', ()=>{
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