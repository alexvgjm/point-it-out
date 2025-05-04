import type { PointerName } from '$lib/types'
import { config, create, update } from '../../src/lib/main'
import { BasePointer } from '../../src/lib/pointers/core'
import { describe, expect, it, vi } from 'vitest'

const createArrowAndRectSpecs = (pointerName: PointerName) => {
  it('creates an element and append it to body if no container specified', async () => {
    const count = document.body.childNodes.length
    create(pointerName, { target: '.existing' })
    expect(document.body.childNodes.length).toBe(count + 1)
  })

  it('creates a BasePointer and return its reference', () => {
    const shape = create(pointerName, { target: '.existing' })
    expect(shape).instanceOf(BasePointer)
  })

  describe(`Options`, async () => {
    describe('target', () => {
      it(`can receive a target element or selector string`, async () => {
        const existing = document.querySelector<HTMLElement>('.existing')!
        create(pointerName, { target: '.existing' })
        create(pointerName, { target: existing })
        expect(document.querySelectorAll('svg')).toHaveLength(2)
      })

      it(`throws if selector doesn't match anything`, async () => {
        expect(() => {
          create(pointerName, { target: '.not-exists' })
        }).toThrow()
      })
    })

    describe('zIndex', () => {
      it(`sets de zIndex property`, async () => {
        const created = create(pointerName, { target: '.existing', zIndex: 1000 })

        expect(created.rootElement.style.zIndex).equal('1000')
      })
    })

    describe('animate', () => {
      describe('Some basic and default specs using "pulse"', () => {
        it('adds an animation style properties with infinite repeat, 1s timing and alternate', () => {
          const pointer = create('rect', {
            target: '.existing',
            animate: 'pulse'
          })

          const styles = getComputedStyle(pointer.rootElement)
          expect(styles.animation).includes('infinite')
          expect(styles.animation).includes('1s')
          expect(styles.animation).includes('alternate')
        })

        it('injects a <style> with the pio__pulse @keyframes', () => {
          create('rect', {
            target: '.existing',
            animate: 'pulse'
          })

          const style = document.head.querySelector<HTMLStyleElement>('#point-it-out-keyframes')!

          expect(style.textContent).includes('@keyframes pio__pulse')
        })
      })
    })
  })

  describe('Methods', async () => {
    describe('destroy', () => {
      it('removes the created htmlElement from DOM', () => {
        const pointer = create(pointerName, { target: '.existing' })
        let htmlElement = document.querySelector('svg')

        pointer.destroy()

        htmlElement = document.querySelector('svg')
        expect(htmlElement).toBeNull()
      })

      it('throws if try to redestroy', () => {
        const pointer = create(pointerName, { target: '.existing' })
        pointer.destroy()
        expect(() => pointer.destroy()).toThrow()
      })

      it('will cause the pointer to be excluded from updates', () => {
        const pointer = create(pointerName, { target: '.existing' })
        const spy = vi.spyOn(pointer, 'update')
        pointer.destroy()
        update()
        expect(spy).not.toHaveBeenCalled()
      })
    })
  })
}

describe.each(['arrow', 'rect'] satisfies PointerName[])(`create('%s')`, createArrowAndRectSpecs)

describe('animate options', () => {
  describe('Some basic and default specs using "pulse"', () => {
    it('adds an animation style properties with infinite repeat, 1s timing and alternate', () => {
      const pointer = create('rect', {
        target: '.existing',
        animate: 'pulse'
      })

      const styles = getComputedStyle(pointer.rootElement)
      expect(styles.animation).includes('infinite')
      expect(styles.animation).includes('1s')
      expect(styles.animation).includes('alternate')
    })

    it('injects a <style> with the pio__pulse @keyframes', () => {
      create('rect', {
        target: '.existing',
        animate: 'pulse'
      })

      const style = document.head.querySelector<HTMLStyleElement>('#point-it-out-keyframes')!

      expect(style.textContent).includes('@keyframes pio__pulse')
    })
  })
})

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
