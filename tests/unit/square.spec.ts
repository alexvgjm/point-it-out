import { describe, expect, it } from 'vitest'
import { create } from '../../src/lib/main'

describe("create('rect')", () => {
	it(`creates a rect element inside the SVG`, async () => {
		create('rect', { target: '.existing' })
		expect(document.querySelector('.existing rect')).toBeDefined()
	})
})
