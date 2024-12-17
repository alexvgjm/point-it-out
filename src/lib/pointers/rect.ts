import {
  BasePointer,
  DEFAULT_COMMON_OPTIONS,
  DEFAULT_SVG_OPTIONS,
  createParentSVG,
  createSVG
} from './core'
import type { CommonAnimations, PointerOptions, SVGPointer } from '../types'
import { getRectsInfo } from './utils'
import { type Animatable, type AnimatableOptions } from './animations/animatable'
import { prepareRectAnimation } from './animations/rect-animations'

const DEFAULT_RECT_OPTIONS: Readonly<Omit<PointerOptions['rect'], 'target'>> = Object.freeze({
  ...DEFAULT_COMMON_OPTIONS,
  ...DEFAULT_SVG_OPTIONS,
  fillColor: 'none',
  round: 0,
  padding: { x: 0, y: 0 },
  animate: false
})

function parsePaddingProps(padding?: PointerOptions['rect']['padding']) {
  if (!padding) {
    return DEFAULT_RECT_OPTIONS.padding as { x: number; y: number }
  }

  if (typeof padding == 'number') {
    return { x: padding, y: padding }
  }

  return {
    x: padding.x ?? 0,
    y: padding.y ?? 0
  }
}

export class RectPointer extends BasePointer implements SVGPointer, Animatable<CommonAnimations> {
  rootElement: HTMLElement | SVGSVGElement

  rectElm: SVGRectElement
  round: number | string | { rx: number | string; ry: number | string } = 0
  padding: { x: number; y: number }
  animate: false | AnimatableOptions<CommonAnimations> = false

  strokeWidth: number
  strokeColor: string
  fillColor: string

  constructor(options: PointerOptions['rect']) {
    const opts = { ...DEFAULT_RECT_OPTIONS, ...options } as Required<PointerOptions['rect']>
    super(opts)

    this.rectElm = createSVG('rect')
    this.rootElement = createParentSVG(opts, true)
    this.rootElement.appendChild(this.rectElm)
    this.container.appendChild(this.rootElement)
    this.round = opts.round
    this.padding = parsePaddingProps(opts.padding)
    this.strokeWidth = opts.strokeWidth
    this.strokeColor = opts.strokeColor
    this.fillColor = opts.fillColor

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

    this.rootElement.style.left = targetLeft - strW - this.padding.x + 'px'
    this.rootElement.style.top = targetTop - strW - this.padding.y + 'px'
    this.rootElement.setAttribute('width', width.toString())
    this.rootElement.setAttribute('height', height.toString())

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
