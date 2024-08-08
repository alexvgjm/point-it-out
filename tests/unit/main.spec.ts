import type { PointerName } from '$lib/types'
import { config, create, update } from '../../src/lib/main'
import { availableShapes, PointItOutPointer } from '../../src/lib/shapes/core'
import { describe, expect, it, vi } from 'vitest'

/**
 * Create all tests of common behavior for each available shape
 */
const createSpecs = (shapeName: PointerName) => {
  it('creates an SVG and append it to body', async () => {
    expect(document.querySelector('svg')).toBeNull()
    create(shapeName, { target: '.existing' })
    expect(document.querySelector('svg')).toBeDefined()
  })

  it('creates a PointItOutShape and return its reference', () => {
    const shape = create(shapeName, { target: '.existing' })
    expect(shape).instanceOf(PointItOutPointer)
  })

  describe(`Options`, async () => {
    describe('target', () => {
      it(`can receive a target element or selector string`, async () => {
        const existing = document.querySelector<HTMLElement>('.existing')!
        create(shapeName, { target: '.existing' })
        create(shapeName, { target: existing })
        expect(document.querySelectorAll('svg')).toHaveLength(2)
      })

      it(`throws if selector doesn't match anything`, async () => {
        expect(() => {
          create(shapeName, { target: '.not-exists' })
        }).toThrow()
      })
    })

    describe('zIndex', () => {
      it(`sets de zIndex property`, async () => {
        create(shapeName, { target: '.existing', zIndex: 1000 })
        const created = document.querySelector('svg')!
        expect(created.style.zIndex).equal('1000')
      })
    })
  })

  describe('Methods', async () => {
    describe('destroy', () => {
      it('removes the created htmlElement from DOM', () => {
        const pointer = create(shapeName, { target: '.existing' })
        let htmlElement = document.querySelector('svg')

        pointer.destroy()

        htmlElement = document.querySelector('svg')
        expect(htmlElement).toBeNull()
      })

      it('throws if try to redestroy', () => {
        const pointer = create(shapeName, { target: '.existing' })
        pointer.destroy()
        expect(() => pointer.destroy()).toThrow()
      })

      it('will cause the pointer to be excluded from updates', () => {
        const pointer = create(shapeName, { target: '.existing' })
        const spy = vi.spyOn(pointer, 'update')
        pointer.destroy()
        update()
        expect(spy).not.toHaveBeenCalled()
      })
    })
  })
}

describe.each(availableShapes)(`create('$shapeName')`, createSpecs)

describe('update()', () => {
  it('should call update of each created shape', () => {
    const s1 = create('rect', { target: '.existing' }) // GIVEN
    const s2 = create('rect', { target: '.existing' })
    const s3 = create('rect', { target: '.existing' })
    const spy1 = vi.spyOn(s1, 'update')
    const spy2 = vi.spyOn(s2, 'update')
    const spy3 = vi.spyOn(s3, 'update')
    expect(spy1).not.toHaveBeenCalled()
    expect(spy2).not.toHaveBeenCalled()
    expect(spy3).not.toHaveBeenCalled()

    update() // WHEN

    expect(spy1).toHaveBeenCalled() // THEN
    expect(spy2).toHaveBeenCalled()
    expect(spy3).toHaveBeenCalled()
  })
})

describe('System options', () => {
  describe('config()', () => {
    /**
     * This test will be deliberately broken every time a new option is added
     * or its default value changed, just to remember that specs/tests must be
     * included ;)
     */
    it('returns a copy of the current global options', () => {
      const options = config({ updateAfterLoad: true })
      expect(options).eql({
        updateAfterLoad: true,
        updateOnResize: true
      })
    })

    it('only alters the specified options', () => {
      let options = config({ updateAfterLoad: true, updateOnResize: false })
      options = config({ updateOnResize: false })
      expect(options).eql({
        updateAfterLoad: true,
        updateOnResize: false
      })

      // ensure updateAfterLoad still active (fixing a bug)
      const pointer = create('rect', { target: '.existing' })
      const spy = vi.spyOn(pointer, 'update')
      window.dispatchEvent(new Event('load'))
      expect(spy).toHaveBeenCalled()
    })
  })

  describe('updateAfterLoad', () => {
    it("calls update after window's load event", () => {
      const pointer = create('rect', { target: '.existing' })
      const spy = vi.spyOn(pointer, 'update')
      config({ updateAfterLoad: true })
      expect(spy).not.toHaveBeenCalled() // sanity check
      window.dispatchEvent(new Event('load'))
      expect(spy).toHaveBeenCalled()
    })
  })
})
