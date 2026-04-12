import {
	BasePointer,
	DEFAULT_COMMON_OPTIONS,
	DEFAULT_SVG_OPTIONS,
	createParentSVG,
	createSVG,
	getTarget
} from './core'
import type { SVGPointer, LinkOptions } from '../types'
import { getRectsInfo } from './utils'

const DEFAULT_LINK_OPTIONS: Readonly<Omit<LinkOptions, 'from' | 'target'>> = Object.freeze({
	...DEFAULT_COMMON_OPTIONS,
	...DEFAULT_SVG_OPTIONS,
	type: 'straight',
	dashArray: '5,5',
	fillColor: 'none'
})

export class LinkPointer extends BasePointer implements SVGPointer {
	rootElement: HTMLElement | SVGSVGElement
	lineElm: SVGLineElement
	fromTarget: HTMLElement | SVGSVGElement

	type: 'straight' | 'dashed'
	dashArray: string
	strokeWidth: number
	strokeColor: string
	fillColor: string

	constructor(options: LinkOptions) {
		const opts = { ...DEFAULT_LINK_OPTIONS, ...options } as Required<LinkOptions>
		super(opts)

		this.fromTarget = getTarget(opts.from)!
		this.target = getTarget(opts.target)!

		this.type = opts.type
		this.dashArray = opts.dashArray
		this.strokeWidth = opts.strokeWidth
		this.strokeColor = opts.strokeColor
		this.fillColor = opts.fillColor

		this.lineElm = createSVG('line')
		this.rootElement = createParentSVG(opts, true)

		this.rootElement.appendChild(this.lineElm)
		this.container.appendChild(this.rootElement)

		this.update()
	}

	update(): void {
		if (!this.fromTarget || !this.target) {return}

		const from = getRectsInfo(this.fromTarget, this.container)
		const to = getRectsInfo(this.target, this.container)

		const x1 = Math.round(from.targetLeft + from.targetRect.width / 2)
		const y1 = Math.round(from.targetTop + from.targetRect.height / 2)
		const x2 = Math.round(to.targetLeft + to.targetRect.width / 2)
		const y2 = Math.round(to.targetTop + to.targetRect.height / 2)

		const p = this.strokeWidth * 2
		const minX = Math.floor(Math.min(x1, x2) - p)
		const minY = Math.floor(Math.min(y1, y2) - p)
		const maxX = Math.ceil(Math.max(x1, x2) + p)
		const maxY = Math.ceil(Math.max(y1, y2) + p)

		const width = maxX - minX
		const height = maxY - minY

		this.rootElement.style.left = `${minX}px`
		this.rootElement.style.top = `${minY}px`
		this.rootElement.setAttribute('width', width.toString())
		this.rootElement.setAttribute('height', height.toString())
		this.rootElement.setAttribute('viewBox', `0 0 ${width} ${height}`)

		this.lineElm.setAttribute('x1', (x1 - minX).toString())
		this.lineElm.setAttribute('y1', (y1 - minY).toString())
		this.lineElm.setAttribute('x2', (x2 - minX).toString())
		this.lineElm.setAttribute('y2', (y2 - minY).toString())

		this.lineElm.setAttribute('stroke', this.strokeColor)
		this.lineElm.setAttribute('stroke-width', this.strokeWidth.toString())

		this.lineElm.setAttribute('stroke-linecap', 'butt')

		if (this.type === 'dashed') {
			const dash = this.dashArray.replace(',', ' ')
			this.lineElm.setAttribute('stroke-dasharray', dash)
		} else {
			this.lineElm.removeAttribute('stroke-dasharray')
		}
	}
}