import { createSVG, PointItOutPointer } from './core'
import type { PointerOptions } from '../types'
import { getRectsInfo } from './utils'

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
    this.path.setAttribute('d', createArrowDPathAttribute(96, 128))
    this.path.style.fill = 'orange'
    this.path.style.stroke = 'none'
    this.htmlElement.style.transformOrigin = 'center left'
    this.htmlElement.style.transform = 'translateY(-50%) rotate(45deg)'
    this.htmlElement.setAttribute('width', '128')
    this.htmlElement.setAttribute('height', '96')
    this.update()
  }

  update(): void {
    const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

    this.htmlElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.htmlElement.style.top = targetTop + targetRect.height / 2 + 'px'
  }
}
