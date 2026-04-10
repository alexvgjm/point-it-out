import { describe, expect, it, beforeAll, vi } from 'vitest'
import { create } from '../../src/lib/main'

describe('create(\'spotlight\')', () => {
	beforeAll(() => {
		const target = document.createElement('div')
		target.classList.add('existing')
		document.body.appendChild(target)
	})

	it('creates a spotlight element', async () => {
		const pointer = create('spotlight', { target: '.existing' })
		expect(document.querySelector('.pio__spotlight')).toBeDefined()
		expect(pointer.rootElement.style.boxShadow).toContain('9999px')
	})

	it('updates position correctly', async () => {
		const target = document.querySelector('.existing') as HTMLElement
		
		// Mock getBoundingClientRect
		vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({
			top: 100,
			left: 100,
			width: 50,
			height: 50,
			bottom: 150,
			right: 150,
			x: 100,
			y: 100,
			toJSON: () => {}
		} as DOMRect)

		const pointer = create('spotlight', { target: '.existing', padding: 10 })
		pointer.update()

		// target is at 100,100 with 50x50. 
		// with padding 10, the hole should be at 90,90 with 70x70
		expect(pointer.rootElement.style.top).toBe('90px')
		expect(pointer.rootElement.style.left).toBe('90px')
		expect(pointer.rootElement.style.width).toBe('70px')
		expect(pointer.rootElement.style.height).toBe('70px')
	})
})
