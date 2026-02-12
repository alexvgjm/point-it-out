import { describe, expect, it } from 'vitest'
import { create } from '../../src/lib/main'

describe("create('spotlight')", () => {
  it(`creates a spotlight element with class pio__spotlight`, async () => {
    create('spotlight', { target: '.existing' })
    expect(document.querySelector('.pio__spotlight')).toBeDefined()
  })
})
