import { createSVG, PointItOutPointer } from './core'
import type { PointerOptions } from '../types'

function createArrowDPathAttribute(w: number, len: number) {
  // pretier-ignore
  const atr = `M 0,          ${w / 2}
   L ${len / 2},   ${w}
   l 0,         -${w / 3}
   l ${len / 2},   0
   l 0,         -${w / 3}
   l -${len / 2},  0
   l 0,         -${w / 3}
   Z`

  return atr
}

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
    this.path.setAttribute('d', createArrowDPathAttribute(128, 96))
  }
}
