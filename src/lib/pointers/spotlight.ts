import { BasePointer, DEFAULT_COMMON_OPTIONS } from './core'
import type { PointerOptions, PointItOutPointer } from '../types'
import { getRectsInfo } from './utils'

const DEFAULT_SPOTLIGHT_OPTIONS: Readonly<Omit<PointerOptions['spotlight'], 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	overlayColor: 'rgba(0, 0, 0, 0.6)',
	padding: 10
})

function parsePaddingProps(padding?: PointerOptions['spotlight']['padding']) {
	if (padding === undefined) {
		return { x: 10, y: 10 }
	}

	if (typeof padding == 'number') {
		return { x: padding, y: padding }
	}

	return {
		x: padding.x ?? 0,
		y: padding.y ?? 0
	}
}

export class SpotlightPointer extends BasePointer implements PointItOutPointer {
	rootElement: HTMLDivElement

	overlayColor: string
	padding: { x: number; y: number }

	constructor(options: PointerOptions['spotlight']) {
		const opts = { ...DEFAULT_SPOTLIGHT_OPTIONS, ...options } as Required<PointerOptions['spotlight']>
		super(opts)

		this.overlayColor = opts.overlayColor
		this.padding = parsePaddingProps(opts.padding)

		this.rootElement = document.createElement('div')
		this.rootElement.classList.add('pio__spotlight')
		if (opts.className) {
			this.rootElement.classList.add(opts.className)
		}

		Object.assign(this.rootElement.style, {
			position: 'absolute',
			zIndex: opts.zIndex!.toString(),
			pointerEvents: 'none',
			boxShadow: `0 0 0 9999px ${this.overlayColor}`
		})

		this.container.appendChild(this.rootElement)

		this.update()
	}

	update(): void {
		if (this.destroyed) {return}

		const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

		const paddingX = this.padding.x
		const paddingY = this.padding.y

		const width = targetRect.width + paddingX * 2
		const height = targetRect.height + paddingY * 2
		const top = targetTop - paddingY
		const left = targetLeft - paddingX

		this.rootElement.style.width = `${width}px`
		this.rootElement.style.height = `${height}px`
		this.rootElement.style.top = `${top}px`
		this.rootElement.style.left = `${left}px`
	}
}
