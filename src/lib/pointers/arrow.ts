import { DEFAULT_SVG_OPTIONS, createParentSVG, createSVG, DEFAULT_COMMON_OPTIONS } from './core'
import type { ArrowPointerOptions, PointerOptions, SVGPointer } from '../types'
import { type AnimatableOptions, type Animatable } from './animations/animatable'
import { DEFAULT_FREE_POINTER_OPTIONS, FreePointer } from './free-pointer'
import { applyVirtualTransform } from './utils'

/**
 * @param w Arrow width
 * @param l Arrow length
 * @param strw strokeWidth
 * @param dist distance
 * @returns the d string
 */
function createArrowDPathAttribute(w: number, l: number, strw: number) {
	// Destroying readability here is justified. The code of D attribute is
	// difficult to compress by gzip and can easily grow.
	// pretier-ignore
	const atr = `M${strw / 2} ${w / 2 + strw / 2} L${l / 2 + strw / 2} ${w + strw / 2} l0 -${w / 3} l${l / 2} 0 l0 -${w / 3} l-${l / 2} 0 l0 -${w / 3} Z`

	return atr
}

const DEFAULT_ARROW_OPTIONS: Readonly<Omit<ArrowPointerOptions, 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	...DEFAULT_SVG_OPTIONS,
	...DEFAULT_FREE_POINTER_OPTIONS,
	strokeWidth: 0,
	transformOrigin: 'left'
})

export class ArrowPointer extends FreePointer implements SVGPointer, Animatable {
	path: SVGPathElement
	strokeWidth: number
	strokeColor: string
	fillColor: string
	animate?: false | AnimatableOptions<'pulse'> = false

	constructor(options: PointerOptions['arrow']) {
		const opts = { ...DEFAULT_ARROW_OPTIONS, ...options } as Required<PointerOptions['arrow']>

		const svg = createParentSVG(opts)
		svg.style.fill = opts.fillColor
		svg.style.stroke = opts.strokeColor
		svg.style.strokeWidth = `${opts.strokeWidth == 0 ? 'none' : opts.strokeWidth}`
		svg.setAttribute('width', `${128 + opts.strokeWidth}`)
		svg.setAttribute('height', `${96 + opts.strokeWidth}`)
		const path = createSVG<SVGPathElement>('path')
		const g = createSVG<SVGGElement>('g')
		path.setAttribute('d', createArrowDPathAttribute(96, 128, opts.strokeWidth))
		g.appendChild(path)
		svg.appendChild(g)

		super({
			...opts,
			pointerElement: svg
		})

		this.strokeWidth = opts.strokeWidth
		this.fillColor = opts.fillColor
		this.strokeColor = opts.strokeColor
		this.path = path
		this._transformOrigin = 'left center'

		applyVirtualTransform(this.transform!, this.pointerElement)
		this.update()
	}
}
