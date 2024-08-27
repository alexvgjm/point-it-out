import { commonSVGOptionsDefaults, createSVG, SVGBasePointer } from './core'
import type { PointerOptions, SVGOptions } from '../types'
import { getRectsInfo } from './utils'
import { type Animatable, type AnimatableOptions } from './animations/animatable'
import { prepareRectAnimation } from './animations/rect-animations'

export interface RectOptions extends Animatable<RectAnimation> {
  /** Space between stroke and content. Can be negative. Default: 0*/
  padding?:
    | number
    | {
        /** Horizontal gap (left and right) */
        x?: number
        /** Vertical gap (top and bottom) */
        y?: number
      }
  round?:
    | number
    | string
    | {
        rx: number | string
        ry: number | string
      }
}

export type RectAnimation = 'pulse'

const rectDefaults: Readonly<Required<SVGOptions & RectOptions>> = Object.freeze({
  ...commonSVGOptionsDefaults,
  fillColor: 'none',
  round: 0,
  padding: { x: 0, y: 0 },
  animate: false
})

function parsePaddingProps(padding?: PointerOptions['rect']['padding']) {
  if (!padding) {
    return rectDefaults.padding as { x: number; y: number }
  }

  if (typeof padding == 'number') {
    return { x: padding, y: padding }
  }

  return {
    x: padding.x ?? 0,
    y: padding.y ?? 0
  }
}

export class RectPointer extends SVGBasePointer implements Animatable<RectAnimation> {
  rectElm: SVGRectElement
  round: number | string | { rx: number | string; ry: number | string } = 0
  padding: { x: number; y: number }

  animate: false | AnimatableOptions<RectAnimation> = false

  constructor(options: PointerOptions['rect']) {
    const opts = Object.freeze({ ...rectDefaults, ...options })
    super(opts)

    this.rectElm = createSVG('rect')
    this.pointerElement.appendChild(this.rectElm)
    this.container.appendChild(this.pointerElement)
    this.round = options.round ?? rectDefaults.round
    this.padding = parsePaddingProps(opts.padding)
    if (opts.animate) {
      prepareRectAnimation(this, opts.animate)
    }
    this.update()
  }

  update(): void {
    const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

    const strW = this.strokeWidth
    const width = targetRect.width + strW * 2 + this.padding.x * 2
    const height = targetRect.height + strW * 2 + this.padding.y * 2
    const offset = Math.round(strW / 2)

    this.pointerElement.style.left = targetLeft - strW - this.padding.x + 'px'
    this.pointerElement.style.top = targetTop - strW - this.padding.y + 'px'
    this.pointerElement.setAttribute('width', width.toString())
    this.pointerElement.setAttribute('height', height.toString())

    this.rectElm.setAttribute('x', `${offset}`)
    this.rectElm.setAttribute('y', `${offset}`)
    this.rectElm.setAttribute('width', `${width - strW}`)
    this.rectElm.setAttribute('height', `${height - strW}`)

    if (typeof this.round == 'object') {
      this.rectElm.setAttribute('rx', `${this.round.rx}`)
      this.rectElm.setAttribute('ry', `${this.round.ry}`)
    } else {
      this.rectElm.setAttribute('rx', `${this.round}`)
    }
  }
}
