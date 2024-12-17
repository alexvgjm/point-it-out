import { DEFAULT_SVG_OPTIONS, createParentSVG, createSVG, DEFAULT_COMMON_OPTIONS } from './core'
import type { ArrowPointerOptions, PointerOptions, SVGPointer } from '../types'
import {
  prepareCommonAnimation,
  type Animatable,
  type AnimatableOptions,
  type CommonAnimations
} from './animations/animatable'
import { DEFAULT_FREE_POINTER_OPTIONS, FreePointer } from './free-pointer'
import { applyVirtualTransform } from './utils'

/**
 * @param w Arrow width
 * @param l Arrow length
 * @param strw strokeWidth
 * @param dist distance
 * @returns the d string
 */
function createArrowDPathAttribute(w: number, l: number, strw: number, dist: number) {
  // Destroying readability here is justified. The code of D attribute is
  // difficult to compress by gzip and can easily grow.
  // pretier-ignore
  const atr = `M${dist + strw / 2} ${w / 2 + strw / 2} L${dist + l / 2 + strw / 2} ${w + strw / 2} l0 -${w / 3} l${l / 2} 0 l0 -${w / 3} l-${l / 2} 0 l0 -${w / 3} Z`

  return atr
}

const DEFAULT_ARROW_OPTIONS: Readonly<Omit<ArrowPointerOptions, 'target'>> = Object.freeze({
  ...DEFAULT_COMMON_OPTIONS,
  ...DEFAULT_SVG_OPTIONS,
  ...DEFAULT_FREE_POINTER_OPTIONS,
  strokeWidth: 0
})

export class ArrowPointer extends FreePointer implements SVGPointer, Animatable<CommonAnimations> {
  path: SVGPathElement
  strokeWidth: number
  strokeColor: string
  fillColor: string

  animate?: false | AnimatableOptions<'pulse'> = false

  /**
   * alias to this.pointerElement
   */
  svg: SVGSVGElement

  constructor(options: PointerOptions['arrow']) {
    const opts = { ...DEFAULT_ARROW_OPTIONS, ...options } as Required<PointerOptions['arrow']>

    const svg = createParentSVG(opts)

    super({
      ...opts,
      pointerElement: svg
    })

    this.strokeWidth = opts.strokeWidth
    this.fillColor = opts.fillColor
    this.strokeColor = opts.strokeColor
    this.svg = svg

    this.transform = {
      ...this.transform,
      translate: { y: '-50%' }
    }

    const g = createSVG<SVGGElement>('g')
    this.path = createSVG<SVGPathElement>('path')
    g.appendChild(this.path)
    this.svg.appendChild(g)

    this.path.setAttribute('d', createArrowDPathAttribute(96, 128, this.strokeWidth, this.distance))

    this.svg.style.transformOrigin = 'left'
    this.svg.style.fill = this.fillColor
    this.svg.style.stroke = this.strokeColor
    this.svg.style.strokeWidth = `${this.strokeWidth == 0 ? 'none' : this.strokeWidth}`
    this.svg.setAttribute('width', `${128 + this.strokeWidth + this.distance}`)
    this.svg.setAttribute('height', `${96 + this.strokeWidth}`)

    if (opts.animate) {
      prepareCommonAnimation(this, opts.animate)
    }

    applyVirtualTransform(this.transform!, this.pointerElement)
    this.update()
  }
}
