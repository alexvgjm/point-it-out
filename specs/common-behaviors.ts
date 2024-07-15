import {test, test as it, expect } from "@playwright/test";
import { CommonOptions } from "../src/types";

/**
 * Create all tests for common behavior of a core function according to DRY. 
 * For example, most of the core functions should create and SVG.
 * @param fnName a name of a public core function.
 */
export function testCommonBehavior(fnName: keyof typeof import('../src/core')) {
    test.describe(`Common OK`, async () => {
        it('creates an SVG with specified class and append it to body', async ({ page })=>{
            await page.goto('/');
            page.evaluate((fnName)=>{
                const fn = window[fnName] as (options: CommonOptions)=>void
                fn({target: '.test-text', className: 'test-class'}) 
            }, fnName)
            const svg = page.locator('svg')
            await expect(svg).toBeAttached()
            await expect(svg).toHaveClass('test-class')
        })
    });

    test.describe(`Common KO`, async () => {
        it(`does nothing if selector doesn't match anything`, async ({ page })=>{
            await page.goto('/');
            page.evaluate((fnName)=>{ 
                const fn = window[fnName] as (options: CommonOptions)=>void
                fn({target: '.asdasdas'}) 
            }, fnName)
            await expect(page.locator('svg')).not.toBeAttached()
        })
    });
}