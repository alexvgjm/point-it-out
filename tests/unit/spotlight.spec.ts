import { describe, expect, it, afterEach } from 'vitest'
import { create, clear } from '../../src/lib/main'

describe('create(\'spotlight\')', () => {

	afterEach(() => {
		clear()
		document.body.innerHTML = ''
	})

	it('creates a spotlight element with class pio__spotlight', () => {
		document.body.innerHTML = '<div class="existing">Target</div>'

		const pointer = create('spotlight', { target: '.existing' })
		const element = document.querySelector('.pio__spotlight')

		expect(element).not.toBeNull()
		expect(element?.classList.contains('pio__spotlight')).toBe(true)

		expect(pointer.rootElement).toBe(element)
	})
})