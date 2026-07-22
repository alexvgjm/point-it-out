import { create } from '../../src/lib/main'
import { BasePointer } from '../../src/lib/pointers/core'
import { describe, expect, it } from 'vitest'

describe('create(\'dot\')', () => {
	it('creates a circle element inside an SVG', () => {
		create('dot', { target: '.existing' })
		expect(document.querySelector('svg circle')).toBeDefined()
	})

	it('creates a BasePointer and return its reference', () => {
		const shape = create('dot', { target: '.existing' })
		expect(shape).instanceOf(BasePointer)
	})

	describe('Options', () => {
		describe('target', () => {
			it('can receive a target element or selector string', () => {
				const existing = document.querySelector<HTMLElement>('.existing')!

				create('dot', { target: '.existing' })
				create('dot', { target: existing })

				expect(document.querySelectorAll('svg circle')).toHaveLength(2)
			})

			it('throws if selector does not match anything', () => {
				expect(() => {
					create('dot', { target: '.not-exists' })
				}).toThrow()
			})
		})

		describe('zIndex', () => {
			it('sets the zIndex style property', () => {
				const created = create('dot', { target: '.existing', zIndex: 1234 })

				expect(created.rootElement.style.zIndex).toEqual('1234')
			})
		})

		describe('SVG defaults', () => {
			it('uses default stroke/fill colors', () => {
				const pointer = create('dot', { target: '.existing' })
				const styles = getComputedStyle(pointer.rootElement)

				expect(styles.stroke).toEqual('darkorange')
				expect(styles.fill).toEqual('orange')
			})
		})

		describe('radius and stroke styles', () => {
			it('applies custom stroke width and colors', () => {
				const pointer = create('dot', {
					target: '.existing',
					strokeWidth: 8,
					strokeColor: 'darkgreen',
					fillColor: 'limegreen'
				})
				const styles = getComputedStyle(pointer.rootElement)

				expect(styles.strokeWidth).toEqual('8px')
				expect(styles.stroke).toEqual('darkgreen')
				expect(styles.fill).toEqual('limegreen')
			})
		})
	})
})