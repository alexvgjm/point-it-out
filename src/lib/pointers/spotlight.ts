import type { CommonOptions, PointItOutPointer } from '../types'
import { BasePointer, DEFAULT_COMMON_OPTIONS } from './core'
import type { Animatable, AnimatableOptions, CommonAnimations } from './animations/animatable'
import { prepareAnimation, animationDefaults } from './animations/animatable'

const DEFAULT_SPOTLIGHT_OPTIONS: Readonly<Omit<SpotlightPointerOptions, 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	overlayColor: 'rgba(0, 0, 0, 0.6)',
	padding: 10,
	animate: false
})

export interface SpotlightPointerOptions extends CommonOptions, Animatable {
	overlayColor?: string
	padding?: number
}

export class SpotlightPointer extends BasePointer implements PointItOutPointer, Animatable {
	rootElement: HTMLElement
	overlayColor: string
	padding: number
	animate: false | AnimatableOptions<CommonAnimations> = false

	private updatePositionHandler: (() => void) | null = null
	private pulseAnimationId: number | null = null
	private basePadding: number = 0

	constructor(options: SpotlightPointerOptions) {
		const opts = { ...DEFAULT_SPOTLIGHT_OPTIONS, ...options } as Required<SpotlightPointerOptions>
		super(opts)

		this.overlayColor = opts.overlayColor
		this.padding = opts.padding

		this.rootElement = document.createElement('div')
		this.rootElement.classList.add('pio__spotlight')
		if (opts.className) {
			this.rootElement.classList.add(opts.className)
		}

		const isBodyContainer = this.container === document.body

		Object.assign(this.rootElement.style, {
			position: isBodyContainer ? 'fixed' : 'absolute',
			top: '0',
			left: '0',
			width: '100%',
			height: '100vh',
			background: this.overlayColor,
			zIndex: opts.zIndex!.toString(),
			pointerEvents: 'none',
			transition: opts.animate && this.isPulse(opts.animate) ? 'none' : (opts.animate ? 'clip-path 0.3s ease-in-out, opacity 0.3s ease-in-out' : 'none'),
			opacity: '0'
		})

		this.container.appendChild(this.rootElement)

		this.basePadding = this.padding

		if (opts.animate) {
			if (this.isPulse(opts.animate)) {
				this.startPulseAnimation(opts.animate)
			} else {
				prepareAnimation(this, opts.animate)
			}
		}

		this.updatePositionHandler = () => this.update()
		window.addEventListener('scroll', this.updatePositionHandler, true)
		window.addEventListener('resize', this.updatePositionHandler)

		this.update()

		requestAnimationFrame(() => {
			this.rootElement.style.opacity = '1'
		})
	}

	update(): void {
		if (this.destroyed) {return}

		const targetRect = this.target.getBoundingClientRect()
		const containerRect = this.container.getBoundingClientRect()

		let top, left

		if (this.container === document.body) {
			top = targetRect.top - this.padding
			left = targetRect.left - this.padding
		} else {
			top = targetRect.top - containerRect.top + this.container.scrollTop - this.padding
			left = targetRect.left - containerRect.left + this.container.scrollLeft - this.padding
		}

		const width = targetRect.width + this.padding * 2
		const height = targetRect.height + this.padding * 2

		if (this.container !== document.body) {
			const totalHeight = this.container.scrollHeight
			this.rootElement.style.height = `${totalHeight}px`
		} else {
			const totalHeight = Math.max(
				document.documentElement.scrollHeight,
				document.documentElement.clientHeight,
				document.body.scrollHeight,
				document.body.clientHeight
			)
			this.rootElement.style.height = `${totalHeight}px`
		}

		this.rootElement.style.clipPath = `polygon(
      0% 0%,
      0% 100%,
      ${left}px 100%,
      ${left}px ${top}px,
      ${left + width}px ${top}px,
      ${left + width}px ${top + height}px,
      ${left}px ${top + height}px,
      ${left}px 100%,
      100% 100%,
      100% 0%
    )`
	}

	private isPulse(animate: false | string | AnimatableOptions<CommonAnimations>): boolean {
		if (!animate) {return false}
		if (typeof animate === 'string') {return animate === 'pulse'}
		return animate.name === 'pulse'
	}

	private startPulseAnimation(animate: string | AnimatableOptions<CommonAnimations>) {
		const opts = {
			...animationDefaults,
			...(typeof animate === 'string' ? { name: animate } : animate)
		}
		const duration = ((opts.duration as number) ?? 1) * 1000
		const pulsePx = 18
		let startTime: number | null = null

		const tick = (time: number) => {
			if (this.destroyed) {return}
			if (!startTime) {startTime = time}
			const elapsed = time - startTime
			const cycle = duration * 2
			const pos = elapsed % cycle
			// 0→1 first half, 1→0 second half (triangle wave)
			const t = pos < duration ? pos / duration : 2 - pos / duration
			// Ease with sine
			const eased = Math.sin((t * Math.PI) / 2)
			this.padding = this.basePadding + eased * pulsePx
			this.update()
			this.pulseAnimationId = requestAnimationFrame(tick)
		}
		this.pulseAnimationId = requestAnimationFrame(tick)
	}

	destroy(): void {
		if (this.destroyed) {return}

		if (this.pulseAnimationId !== null) {
			cancelAnimationFrame(this.pulseAnimationId)
			this.pulseAnimationId = null
		}

		this.rootElement.style.opacity = '0'

		if (this.updatePositionHandler) {
			window.removeEventListener('scroll', this.updatePositionHandler, true)
			window.removeEventListener('resize', this.updatePositionHandler)
			this.updatePositionHandler = null
		}

		setTimeout(() => {
			super.destroy()
		}, 300)
	}
}
