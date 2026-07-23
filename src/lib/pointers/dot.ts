import {
	BasePointer,
	DEFAULT_COMMON_OPTIONS,
	DEFAULT_SVG_OPTIONS,
	createParentSVG,
	createSVG
} from './core'
import type { Origin, PointerOptions, SVGPointer } from '../types'
import {
	prepareAnimation,
	type Animatable,
	type AnimatableOptions,
	type CommonAnimations
} from './animations/animatable'
import { getRectsInfo } from './utils'
import { getAsPercentsNumbers } from '$lib/values'

const DEFAULT_DOT_OPTIONS: Readonly<Omit<PointerOptions['dot'], 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	...DEFAULT_SVG_OPTIONS,
	radius: 10,
	position: 'center center',
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

	/** numbers as percent */
	private _position: {
		x: number,
		y: number
	} = {x: 50, y: 50}

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
		this.position = opts.position

		if (opts.animate) {
			prepareAnimation(this, opts.animate)
		}

		this.update()
	}

	set position(value: Origin) {
		Object.assign(this._position, getAsPercentsNumbers(value))
	}

	update(): void {
		const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

		const strW = this.strokeWidth
		const size = this.radius * 2 + strW * 2
		const targetW = targetRect.width
		const targetH = targetRect.height
		
		const x = targetW * (this._position.x / 100)
		const y = targetH * (this._position.y / 100)

		this.rootElement.style.left = (x + targetLeft - this.radius - strW) + 'px'
		this.rootElement.style.top = (y + targetTop - this.radius - strW) + 'px'
		this.rootElement.setAttribute('width', size.toString())
		this.rootElement.setAttribute('height', size.toString())

		const circleCenter = this.radius + strW
		this.circleElm.setAttribute('cx', `${circleCenter}`)
		this.circleElm.setAttribute('cy', `${circleCenter}`)
		this.circleElm.setAttribute('r', `${this.radius}`)
	}
}
