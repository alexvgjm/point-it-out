import type { ShapeName } from "$lib/types";
import { create, update } from "../../src/lib/main";
import { availableShapes, PointItOutShape } from "../../src/lib/shapes/core";
import { describe, expect, it, vi } from "vitest";


/**
 * Create all tests of common behavior for each available shape
 */
const createSpecs = (shapeName: ShapeName) => {
    it('creates an SVG and append it to body', async ()=>{
        expect(document.querySelector('svg')).toBeNull()
        create(shapeName, {target: '.existing'})
        expect(document.querySelector('svg')).toBeDefined()
    })

    it('creates a PointItOutShape and return its reference', ()=>{
        const shape = create(shapeName, {target: '.existing'})
        expect(shape).instanceOf(PointItOutShape)
    })

    describe(`Options`, async () => {
        describe('target', ()=>{
            it(`can receive a target element or selector string`, async ()=>{
                const existing = document.querySelector<HTMLElement>('.existing')!
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
    `create('$shapeName')`, createSpecs
)

describe('update()', ()=>{
    it('should call update of each created shape', ()=>{
        const s1 = create('rect', {target: '.existing'})      // GIVEN
        const s2 = create('rect', {target: '.existing'})
        const s3 = create('rect', {target: '.existing'})
        const spy1 = vi.spyOn(s1, 'update')
        const spy2 = vi.spyOn(s2, 'update')
        const spy3 = vi.spyOn(s3, 'update')
        expect(spy1).not.toHaveBeenCalled()
        expect(spy2).not.toHaveBeenCalled()
        expect(spy3).not.toHaveBeenCalled()

        update()                            // WHEN
        
        expect(spy1).toHaveBeenCalled()     // THEN
        expect(spy2).toHaveBeenCalled()
        expect(spy3).toHaveBeenCalled()
    })
})