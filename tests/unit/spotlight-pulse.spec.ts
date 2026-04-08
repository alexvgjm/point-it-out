import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import * as pio from '../../src/lib/main'

describe('Animación Pulse - Spotlight (JS-based)', () => {
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

	it('spotlight con pulse NO aplica CSS animation al rootElement', () => {
		const pointer = pio.create('spotlight', {
			target: '#target',
			animate: 'pulse'
		})

		const root = pointer.rootElement as HTMLElement
		// El spotlight pulse es JS-based: no debe tener CSS animation en el rootElement
		expect(root.style.animation).toBe('')
	})

	it('spotlight con pulse tiene clipPath definido (la animación JS actualiza el hole)', () => {
		const pointer = pio.create('spotlight', {
			target: '#target',
			animate: 'pulse'
		})

		const root = pointer.rootElement as HTMLElement
		expect(root.style.clipPath).toContain('polygon')
	})

	it('spotlight con pulse no inyecta keyframes en el DOM', () => {
		pio.create('spotlight', {
			target: '#target',
			animate: 'pulse'
		})

		const styleSheet = document.head.querySelector('#point-it-out-keyframes')
		// No debería haber keyframes CSS para el pulse de spotlight
		const hasSpotlightPulse = styleSheet?.innerHTML?.includes('@keyframes pio__pulse') ?? false
		expect(hasSpotlightPulse).toBe(false)
	})
})

describe('Animación Pulse - Rect (CSS-based)', () => {
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

	it('rect con pulse SÍ aplica CSS animation al rootElement', () => {
		const pointer = pio.create('rect', {
			target: '#target',
			animate: 'pulse'
		})

		const root = pointer.rootElement as HTMLElement
		expect(root.style.animation).toContain('pio__pulse')
	})

	it('rect con pulse inyecta los keyframes pio__pulse en el DOM', () => {
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
