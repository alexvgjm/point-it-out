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
                fn({target: 'h1', className: 'test-class'}) 
            }, fnName)
            const svg = page.locator('.test-class')
            await expect(svg).toBeAttached()
        })
    });

    test.describe(`Common KO`, async () => {
        it(`does nothing if selector doesn't match anything`, async ({ page })=>{
            await page.goto('/');
            page.evaluate((fnName)=>{ 
                const fn = window[fnName] as (options: CommonOptions)=>void
                fn({target: '.not-existing'}) 
            }, fnName)
            await expect(page.locator('svg')).not.toBeAttached()
        })
    });
}