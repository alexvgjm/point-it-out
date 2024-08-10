import { createSVG, PointItOutSVGPointer } from './core'
import type { PointerOptions } from '../types'
import { getRectsInfo } from './utils'

export class RectPointer extends PointItOutSVGPointer {
  rectElm: SVGRectElement

  round: number | string | { rx: number | string; ry: number | string } = 0
  padding: { x: number; y: number }

  constructor(options: PointerOptions['rect']) {
    super(options)
    this.rectElm = createSVG('rect')
    this.htmlElement.appendChild(this.rectElm)
    this.container.appendChild(this.htmlElement)
    this.round = options.round || 0

    if (options.padding === undefined) {
      options.padding = { x: 0, y: 0 }
    } else if (typeof options.padding == 'number') {
      options.padding = { x: options.padding, y: options.padding }
    }

    this.padding = {
      x: options.padding.x ?? 0,
      y: options.padding.y ?? 0
    }

    this.update()
  }

  update(): void {
    const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

    const strW = this.strokeWidth
    const width = targetRect.width + strW * 2 + this.padding.x * 2
    const height = targetRect.height + strW * 2 + this.padding.y * 2
    const offset = Math.round(strW / 2)

    this.htmlElement.style.left = targetLeft - strW - this.padding.x + 'px'
    this.htmlElement.style.top = targetTop - strW - this.padding.y + 'px'
    this.htmlElement.setAttribute('width', width.toString())
    this.htmlElement.setAttribute('height', height.toString())

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
