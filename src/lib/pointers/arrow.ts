import { commonSVGOptionsDefaults, createSVG, PointItOutSVGPointer } from './core'
import type { PointerOptions, SVGOptions } from '../types'
import { getRectsInfo, originStringToAngle } from './utils'

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

const arrowDefaults: Readonly<Required<SVGOptions>> = Object.freeze({
  ...commonSVGOptionsDefaults,
  strokeWidth: 0,
  distance: 0
})

export class ArrowPointer extends PointItOutSVGPointer {
  path: SVGPathElement

  fromAngle: number
  distance: number

  constructor(options: PointerOptions['arrow']) {
    super({ ...arrowDefaults, ...options })
    const g = createSVG<SVGGElement>('g')
    this.path = createSVG<SVGPathElement>('path')
    g.appendChild(this.path)
    this.htmlElement.appendChild(g)
    this.container.appendChild(this.htmlElement)

    if (typeof options.fromAngle == 'string') {
      this.fromAngle = originStringToAngle(options.fromAngle)
    } else {
      this.fromAngle = options.fromAngle ?? 45
    }

    this.distance = options.distance ?? 0
    this.path.setAttribute('d', createArrowDPathAttribute(96, 128, this.strokeWidth, this.distance))

    this.htmlElement.style.fill = this.fillColor
    this.htmlElement.style.stroke = this.strokeColor
    this.htmlElement.style.strokeWidth = `${this.strokeWidth == 0 ? 'none' : this.strokeWidth}`

    this.htmlElement.style.transformOrigin = 'center left'
    this.htmlElement.style.transform = `translateY(-50%) rotate(${this.fromAngle}deg)`
    this.htmlElement.setAttribute('width', `${128 + this.strokeWidth + this.distance}`)
    this.htmlElement.setAttribute('height', `${96 + this.strokeWidth}`)

    this.update()
  }

  update(): void {
    const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

    this.htmlElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.htmlElement.style.top = targetTop + targetRect.height / 2 + 'px'
  }
}
