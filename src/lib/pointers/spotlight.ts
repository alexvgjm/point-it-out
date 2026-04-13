import { BasePointer, DEFAULT_COMMON_OPTIONS } from './core'
import type { PointerOptions, PointItOutPointer } from '../types'
import { getRectsInfo } from './utils'
import { animationDefaults } from './animations/animatable'

type PulseAnimationConfig = 
    | 'pulse' 
    | { name: 'pulse'; duration?: number; easing?: string } 
    | null
    | undefined
    | false;

const DEFAULT_SPOTLIGHT_OPTIONS: Readonly<Omit<PointerOptions['spotlight'], 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	overlayColor: 'rgba(0, 0, 0, 0.6)',
	padding: 10
})

function parsePaddingProps(padding?: PointerOptions['spotlight']['padding']) {
	if (padding === undefined) {return { x: 10, y: 10 }}
	if (typeof padding === 'number') {return { x: padding, y: padding }}
	return {
		x: padding.x ?? 0,
		y: padding.y ?? 0
	}
}

export class SpotlightPointer extends BasePointer implements PointItOutPointer {
	rootElement: HTMLDivElement
	overlayColor: string
	padding: { x: number; y: number }
    
	// Pulse animation properties
	private pulseAnimationId: number | null = null
	private basePadding: { x: number; y: number }

	constructor(options: PointerOptions['spotlight']) {
		const opts = { ...DEFAULT_SPOTLIGHT_OPTIONS, ...options } as Required<PointerOptions['spotlight']>
		super(opts)

		this.overlayColor = opts.overlayColor
		this.basePadding = parsePaddingProps(opts.padding)
		this.padding = { ...this.basePadding }

		this.rootElement = document.createElement('div')
		this.rootElement.classList.add('pio__spotlight')
		if (opts.className) {
			this.rootElement.classList.add(opts.className)
		}

		Object.assign(this.rootElement.style, {
			position: 'absolute',
			zIndex: opts.zIndex!.toString(),
			pointerEvents: 'none',
			boxShadow: `0 0 0 9999px ${this.overlayColor}`,
			// Smooth transition for static updates, disabled during pulse
			transition: opts.animate ? 'all 0.3s ease-out' : 'none',
			opacity: '0'
		})

		this.container.appendChild(this.rootElement)

		// Initialize Pulse animation if requested
		if (opts.animate && this.isPulse(opts.animate)) {
			// Disable CSS transitions to prevent conflict with requestAnimationFrame
			this.rootElement.style.transition = 'none'
			this.startPulseAnimation(opts.animate)
		}

		this.update()

		// Fade in effect
		requestAnimationFrame(() => {
			this.rootElement.style.opacity = '1'
		})
	}

	private isPulse(animate: PulseAnimationConfig): boolean {
		if (!animate) {return false}
		if (typeof animate === 'string') {return animate === 'pulse'}
		return animate.name === 'pulse'
	}

	private startPulseAnimation(animate: Exclude<PulseAnimationConfig, null | undefined | false>) {
		const opts = {
			...animationDefaults,
			...(typeof animate === 'string' ? { name: animate } : animate)
		}
        
		const duration = ((opts.duration as number) ?? 1) * 1000
		let startTime: number | null = null

		const tick = (time: number) => {
			if (this.destroyed) {return}
			if (!startTime) {startTime = time}
			const elapsed = time - startTime

			const targetRect = this.target.getBoundingClientRect()
			const minSize = Math.min(targetRect.width, targetRect.height)

			// Dynamic logic: scaling pulse intensity based on element size
			// Safety margin: 4% of size (min 6px, max 20px)
			const dynamicOffset = Math.max(6, Math.min(20, minSize * 0.04))
			// Pulse amplitude: 5% of size (min 8px, max 20px)
			const dynamicPulse = Math.max(8, Math.min(20, minSize * 0.05))

			const phase = (elapsed % (duration * 2)) * Math.PI / duration
			const eased = (1 - Math.cos(phase)) / 2

			const extraPadding = dynamicOffset + (eased * dynamicPulse)
            
			// Apply dynamic padding to both axes
			this.padding = {
				x: this.basePadding.x + extraPadding,
				y: this.basePadding.y + extraPadding
			}

			this.update()
			this.pulseAnimationId = requestAnimationFrame(tick)
		}
		this.pulseAnimationId = requestAnimationFrame(tick)
	}

	update(): void {
		if (this.destroyed) {return}

		const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

		const width = targetRect.width + this.padding.x * 2
		const height = targetRect.height + this.padding.y * 2
		const top = targetTop - this.padding.y
		const left = targetLeft - this.padding.x

		this.rootElement.style.width = `${width}px`
		this.rootElement.style.height = `${height}px`
		this.rootElement.style.top = `${top}px`
		this.rootElement.style.left = `${left}px`
	}

	override destroy(): void {
		if (this.destroyed) {return}
        
		// Clean up animation frame to prevent memory leaks
		if (this.pulseAnimationId !== null) {
			cancelAnimationFrame(this.pulseAnimationId)
			this.pulseAnimationId = null
		}

		// Fade out before removal
		this.rootElement.style.opacity = '0'
		setTimeout(() => {
			if (this.rootElement?.parentNode) {
				this.rootElement.parentNode.removeChild(this.rootElement)
			}
			super.destroy()
		}, 300)
	}
}