import { describe, expect, it } from 'vitest'
import { create } from '../../src/lib/main'

describe("create('rect')", () => {
  it(`creates a rect element inside the SVG`, async () => {
    create('rect', { target: '.existing' })
    expect(document.querySelector('.existing rect')).toBeDefined()
  })

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
})
