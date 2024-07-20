import { CommonOptions } from "../../src/types";
import { beforeEach, describe, expect, it } from "vitest";

import * as coreFunctions from "../../src/core";

/**
 * Create all tests of common behavior for each individual core function.
 */
const commonSpecs = ({fn}: {fn: (options: CommonOptions)=>void}) => {
    it('creates an SVG and append it to body', async ()=>{
        expect(document.querySelector('svg')).toBeNull()
        fn({target: '.existing'})
        expect(document.querySelector('svg')).toBeDefined()
    })

    describe(`Options`, async () => {
        describe('target', ()=>{
            it(`can receive a target element or selector string`, async ()=>{
                const existing = document.querySelector<HTMLElement>('.existing')
                fn({target: '.existing'})
                fn({target: existing})
                expect(document.querySelectorAll('svg')).toHaveLength(2)
            })

            it(`does nothing if selector doesn't match anything`, async ()=>{
                fn({target: '.existing'})
                expect(document.querySelector('.existing')).toBeDefined()
            })
        })
    })
}

describe.each(Object.entries(coreFunctions).map(([fnName, fn]) => ({fnName, fn})))(
    `$fnName - Common specs`, commonSpecs
)