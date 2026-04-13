import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import * as pio from '../../src/lib/main'

describe('Pulse Animation - Spotlight (JS-based)', () => {
	let target: HTMLElement

	beforeEach(() => {
		target = document.createElement('div')
		target.id = 'target'
		target.style.width = '100px'
		target.style.height = '100px'
		document.body.appendChild(target)
	})

	afterEach(() => {
		pio.clear()
		document.body.innerHTML = ''
		document.head.querySelector('#point-it-out-keyframes')?.remove()
	})

	it('spotlight with pulse DOES NOT apply CSS animation to rootElement', () => {
		const pointer = pio.create('spotlight', {
			target: '#target',
			animate: 'pulse'
		})

		const root = pointer.rootElement as HTMLElement
		// Spotlight pulse is JS-based: it should not have a CSS animation on the rootElement
		expect(root.style.animation).toBe('')
	})

	it('spotlight with pulse has clipPath defined (JS animation updates the hole)', () => {
		const pointer = pio.create('spotlight', {
			target: '#target',
			animate: 'pulse'
		})

		const root = pointer.rootElement as HTMLElement
		expect(root.style.clipPath).toContain('polygon')
	})

	it('spotlight with pulse does not inject keyframes into the DOM', () => {
		pio.create('spotlight', {
			target: '#target',
			animate: 'pulse'
		})

		const styleSheet = document.head.querySelector('#point-it-out-keyframes')
		// There should be no CSS keyframes for the spotlight pulse
		const hasSpotlightPulse = styleSheet?.innerHTML?.includes('@keyframes pio__pulse') ?? false
		expect(hasSpotlightPulse).toBe(false)
	})
})

describe('Pulse Animation - Rect (CSS-based)', () => {
	let target: HTMLElement

	beforeEach(() => {
		target = document.createElement('div')
		target.id = 'target'
		document.body.appendChild(target)
	})

	afterEach(() => {
		pio.clear()
		document.body.innerHTML = ''
		document.head.querySelector('#point-it-out-keyframes')?.remove()
	})

	it('rect with pulse DOES apply CSS animation to rootElement', () => {
		const pointer = pio.create('rect', {
			target: '#target',
			animate: 'pulse'
		})

		const root = pointer.rootElement as HTMLElement
		expect(root.style.animation).toContain('pio__pulse')
	})

	it('rect with pulse injects pio__pulse keyframes into the DOM', () => {
		pio.create('rect', {
			target: '#target',
			animate: 'pulse'
		})

		const styleSheet = document.head.querySelector('#point-it-out-keyframes')
		expect(styleSheet?.innerHTML).toContain('@keyframes pio__pulse')
		expect(styleSheet?.innerHTML).toContain('transform: scale(0.95)')
		expect(styleSheet?.innerHTML).toContain('transform: scale(1.1)')
	})
})