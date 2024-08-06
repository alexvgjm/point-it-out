import { createSVG, PointItOutPointer } from './core'
import type { PointerOptions } from '../types'

export class RectPointer extends PointItOutPointer {
  rectElm: SVGRectElement

  round: number | string | { rx: number | string; ry: number | string } = 0

  constructor(options: PointerOptions['rect']) {
    super(options)
    this.rectElm = createSVG('rect')
    this.svg.appendChild(this.rectElm)
    this.container.appendChild(this.svg)
    this.round = options.round || 0
    this.update()
  }

  update(): void {
    const htmlRect = this.target.getBoundingClientRect()
    const parentRect = this.container.getBoundingClientRect()
    const strW = this.strokeWidth
    const width = htmlRect.width + strW * 2 + this.padding.x * 2
    const height = htmlRect.height + strW * 2 + this.padding.y * 2
    const offset = Math.round(strW / 2)

    const relativeTop = htmlRect.top - parentRect.top
    const relativeLeft = htmlRect.left - parentRect.left

    const targetTop = relativeTop + this.container.scrollTop
    const targetLeft = relativeLeft + this.container.scrollLeft

    this.svg.style.left = targetLeft - strW - this.padding.x + 'px'
    this.svg.style.top = targetTop - strW - this.padding.y + 'px'
    this.svg.setAttribute('width', width.toString())
    this.svg.setAttribute('height', height.toString())

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
