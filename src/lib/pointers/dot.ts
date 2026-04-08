import {
	BasePointer,
	DEFAULT_COMMON_OPTIONS,
	DEFAULT_SVG_OPTIONS,
	createParentSVG,
	createSVG
} from './core'
import type { PointerOptions, SVGPointer } from '../types'
import {
	prepareAnimation,
	type Animatable,
	type AnimatableOptions,
	type CommonAnimations
} from './animations/animatable'
import { getRectsInfo } from './utils'

const DEFAULT_DOT_OPTIONS: Readonly<Omit<PointerOptions['dot'], 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	...DEFAULT_SVG_OPTIONS,
	radius: 10,
	animate: false
})

export class DotPointer extends BasePointer implements SVGPointer, Animatable {
	rootElement: HTMLElement | SVGSVGElement

	circleElm: SVGCircleElement
	radius: number
	animate: false | AnimatableOptions<CommonAnimations> = false

	strokeWidth: number
	strokeColor: string
	fillColor: string

	constructor(options: PointerOptions['dot']) {
		const opts = { ...DEFAULT_DOT_OPTIONS, ...options } as Required<PointerOptions['dot']>
		super(opts)

		this.circleElm = createSVG('circle')
		this.rootElement = createParentSVG(opts, true)
		this.rootElement.appendChild(this.circleElm)
		this.container.appendChild(this.rootElement)
		this.radius = opts.radius
		this.strokeWidth = opts.strokeWidth
		this.strokeColor = opts.strokeColor
		this.fillColor = opts.fillColor

		if (opts.animate) {
			prepareAnimation(this, opts.animate)
		}

		this.update()
	}

	update(): void {
		const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

		const strW = this.strokeWidth
		const size = this.radius * 2 + strW * 2
		const centerX = targetRect.width / 2
		const centerY = targetRect.height / 2

		// Position the SVG at the target's position
		this.rootElement.style.left = targetLeft + centerX - this.radius - strW + 'px'
		this.rootElement.style.top = targetTop + centerY - this.radius - strW + 'px'
		this.rootElement.setAttribute('width', size.toString())
		this.rootElement.setAttribute('height', size.toString())

		// Draw the circle in the center of the SVG
		const circleCenter = this.radius + strW
		this.circleElm.setAttribute('cx', `${circleCenter}`)
		this.circleElm.setAttribute('cy', `${circleCenter}`)
		this.circleElm.setAttribute('r', `${this.radius}`)
	}
}
