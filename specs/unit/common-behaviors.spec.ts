import { create } from "../../src/main";
import { availableShapes } from "../../src/shapes/core";
import { ShapeName } from "../../src/types";
import { describe, expect, it } from "vitest";


/**
 * Create all tests of common behavior for each individual core function.
 */
const commonSpecs = (shapeName: ShapeName) => {
    it('creates an SVG and append it to body', async ()=>{
        expect(document.querySelector('svg')).toBeNull()
        create(shapeName, {target: '.existing'})
        expect(document.querySelector('svg')).toBeDefined()
    })

    describe(`Options`, async () => {
        describe('target', ()=>{
            it(`can receive a target element or selector string`, async ()=>{
                const existing = document.querySelector<HTMLElement>('.existing')
                create(shapeName, {target: '.existing'})
                create(shapeName, {target: existing})
                expect(document.querySelectorAll('svg')).toHaveLength(2)
            })

            it(`throws if selector doesn't match anything`, async ()=>{
                expect(() => {
                    create(shapeName, {target: '.not-exists'})
                }).toThrow()
            })
        })
    })
}

describe.each(availableShapes)(
    `$shapeName - Common specs`, commonSpecs
)