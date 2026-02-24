import { create } from '../../src/lib/main'
import { BasePointer } from '../../src/lib/pointers/core'
import { describe, expect, it } from 'vitest'

describe('create(\'free\', ...)', () => {
	it('uses an existing element as pointer, wrapping it in a pointer div', async () => {
		create('free', { target: '.existing', pointerElement: '.pointer-element' })

		expect(document.querySelectorAll('.pio__pointer-wrapper')).toHaveLength(1)
	})

	it('creates a BasePointer and return its reference', () => {
		const shape = create('free', { target: '.existing', pointerElement: '.pointer-element' })
		expect(shape).instanceOf(BasePointer)
	})

	it('removes old wrapper if recreated using same element', () => {
		create('free', { target: '.existing', pointerElement: '.pointer-element' })
		create('free', { target: '.existing', pointerElement: '.pointer-element' })

		expect(document.querySelectorAll('.pio__pointer-wrapper')).toHaveLength(1)
	})

	describe('Options', async () => {
		describe('target', () => {
			it('can receive a target element or selector string', async () => {
				const existing = document.querySelector<HTMLElement>('.existing')!

				create('free', { target: '.existing', pointerElement: '.pointer-element' })
				create('free', { target: existing, pointerElement: '.pointer-element' })
				expect(document.querySelector('.pio__pointer-wrapper')).toBeDefined()
			})

			it('throws if target selector doesn\'t match anything', async () => {
				expect(() => {
					create('free', { target: '.not-exists', pointerElement: '.pointer-element' })
				}).toThrow()
			})

			it('throws if pointerElement selector doesn\'t match anything', async () => {
				expect(() => {
					create('free', { target: '.exists', pointerElement: '.not-existing-pointer-element' })
				}).toThrow()
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
})
