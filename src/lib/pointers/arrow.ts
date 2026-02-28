import { DEFAULT_SVG_OPTIONS, createParentSVG, createSVG, DEFAULT_COMMON_OPTIONS } from './core'
import type { ArrowPointerOptions, ArrowShape, PointerOptions, SVGPointer } from '../types'
import { type AnimatableOptions, type Animatable } from './animations/animatable'
import { DEFAULT_FREE_POINTER_OPTIONS, FreePointer } from './free-pointer'
import { applyVirtualTransform } from './utils'

const DEFAULT_SHAPE: Required<ArrowShape> = {
	tailWidth: 32,
	tailLength: 64,
	headWidth: 96,
	headLength: 64,
	tipTaper: 0,
	baseCurvature: 0,
	tailCurvature: 0,
	headCurvature: 0
}

function createArrowDPathAttribute(s: Required<ArrowShape>, w: number) {
	/**
     * Destroying readability is intentional. The SVG 'd' attribute string is highly 
     * redundant and resists standard gzip compression. To minimize the final bundle 
     * footprint and execution overhead, we use pre-calculated shorthand variables 
     * and a unified command dispatcher (L/Q) to keep the path logic as lean as possible.
     */
	const { tailWidth: tw, tailLength: tl, headWidth: hw, headLength: hl, tipTaper: tp, baseCurvature: bc, tailCurvature: tc, headCurvature: hc } = s
	const r = w / 2, y = hw / 2, x = r, v = y + r, n = hl + r, m = (hw - tw) / 2 + r, k = m + tw, h = hl + tp + r, e = hl + tl + r
	const f = (c: number, x1: number, y1: number, x2: number, y2: number) => c === 0 ? `L ${x2} ${y2}` : `Q ${x1} ${y1} ${x2} ${y2}`

	return [
		`M ${x} ${v}`,
		f(hc, x + hl / 2, v - hw / 4 + hc, h, r),
		f(hc, h - tp / 2, m - hc, n, m),
		f(tc, n + tl / 2, m + tc, e, m),
		f(bc, e - bc, v, e, k),
		f(tc, n + tl / 2, k - tc, n, k),
		f(hc, h - tp / 2, k + hc, h, hw + r),
		f(hc, x + hl / 2, v + hw / 4 - hc, x, v),
		'Z'
	].join(' ')
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
		const { shape: customShape, ...otherOptions } = options
		const shape = { ...DEFAULT_SHAPE, ...customShape } as Required<ArrowShape>
		const opts = { ...DEFAULT_ARROW_OPTIONS, ...otherOptions, shape } as Required<PointerOptions['arrow']>

		const svg = createParentSVG(opts)

		const svgW = shape.tailLength + shape.headLength + opts.strokeWidth
		const svgH = Math.max(shape.tailWidth, shape.headWidth) + opts.strokeWidth

		svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`)
		svg.style.fill = opts.fillColor
		svg.style.stroke = opts.strokeColor
		svg.style.strokeWidth = `${opts.strokeWidth === 0 ? '0' : opts.strokeWidth}`

		svg.setAttribute('width', `${svgW}`)
		svg.setAttribute('height', `${svgH}`)

		const path = createSVG<SVGPathElement>('path')
		const g = createSVG<SVGGElement>('g')

		path.setAttribute('d', createArrowDPathAttribute(shape, opts.strokeWidth))

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