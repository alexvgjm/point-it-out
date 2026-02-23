import { DEFAULT_SVG_OPTIONS, createParentSVG, createSVG, DEFAULT_COMMON_OPTIONS } from './core'
import type { ArrowPointerOptions, ArrowShape, PointerOptions, SVGPointer } from '../types'
import { type AnimatableOptions, type Animatable } from './animations/animatable'
import { DEFAULT_FREE_POINTER_OPTIONS, FreePointer } from './free-pointer'
import { applyVirtualTransform } from './utils'

/**
 * Default geometric configuration for the arrow shape.
 */
const DEFAULT_SHAPE: Required<ArrowShape> = {
  tailWidth: 32,
  tailLength: 64,
  headWidth: 96,
  headLength: 64
}

/**
 * @param shape Object containing the geometric dimensions of the arrow
 * @param strw Stroke width to calculate the offset and avoid clipping
 * @returns The SVG path data string (d attribute)
 */
function createArrowDPathAttribute(shape: Required<ArrowShape>, strw: number) {
  const { tailWidth: tw, tailLength: tl, headWidth: hw, headLength: hl } = shape
  const sw = strw / 2
  const centerY = hw / 2

  // Destroying readability here is justified. The code of D attribute is
  // difficult to compress by gzip and can easily grow.
  // Drawing from top-left of the tail, following clockwise path.
  return (
    `M ${sw} ${centerY + sw} ` +
    `l ${hl} ${-hw / 2} ` +
    `l 0 ${(hw - tw) / 2} ` +
    `l ${tl} 0 ` +
    `l 0 ${tw} ` +
    `l ${-tl} 0 ` +
    `l 0 ${(hw - tw) / 2} ` +
    `Z`
  )
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
    // Merge provided shape options with defaults
    const shape = { ...DEFAULT_SHAPE, ...options.shape } as Required<ArrowShape>
    const opts = { ...DEFAULT_ARROW_OPTIONS, ...options } as Required<PointerOptions['arrow']>

    const svg = createParentSVG(opts)

    // Calculate dynamic SVG dimensions based on arrow geometry and stroke
    const svgW = shape.tailLength + shape.headLength + opts.strokeWidth
    const svgH = Math.max(shape.tailWidth, shape.headWidth) + opts.strokeWidth

    svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`)

    svg.style.fill = opts.fillColor
    svg.style.stroke = opts.strokeColor
    svg.style.strokeWidth = `${opts.strokeWidth == 0 ? 'none' : opts.strokeWidth}`

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
