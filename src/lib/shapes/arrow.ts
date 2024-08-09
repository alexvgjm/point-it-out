import { createSVG, PointItOutPointer } from './core'
import type { PointerOptions } from '../types'

export class ArrowPointer extends PointItOutPointer {
  path: SVGPathElement

  constructor(options: PointerOptions['arrow']) {
    super(options)
    const g = createSVG<SVGGElement>('g')
    this.path = createSVG<SVGPathElement>('path')
    g.appendChild(this.path)
    this.htmlElement.appendChild(g)
    this.container.appendChild(this.htmlElement)
    this.update()
  }

  update(): void {
    // TODO:
  }
}
