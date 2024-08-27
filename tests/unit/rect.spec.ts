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

        const styles = getComputedStyle(pointer.pointerElement)
        expect(styles.animation).includes('infinite')
        expect(styles.animation).includes('1s')
        expect(styles.animation).includes('alternate')
      })
    })
  })
})
