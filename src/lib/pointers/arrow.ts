import { commonSVGOptionsDefaults, createSVG, SVGBasePointer } from './core'
import type { PointerOptions, SVGOptions } from '../types'
import { getRectsInfo } from './utils'
import { sizeNameToNumber, originToAngleMap } from '$lib/values'

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
  fromAngle: 45,
  distance: 0,
  size: 1
})

export class ArrowPointer extends SVGBasePointer {
  path: SVGPathElement

  fromAngle: number
  distance: number
  size: number

  constructor(options: PointerOptions['arrow']) {
    const opts = { ...arrowDefaults, ...options } as Required<PointerOptions['arrow']>
    super(opts)
    const g = createSVG<SVGGElement>('g')
    this.path = createSVG<SVGPathElement>('path')
    g.appendChild(this.path)
    this.pointerElement.appendChild(g)
    this.container.appendChild(this.pointerElement)

    if (typeof opts.fromAngle === 'string') {
      this.fromAngle = originToAngleMap[opts.fromAngle]
    } else {
      this.fromAngle = opts.fromAngle
    }

    this.distance = opts.distance
    if (typeof opts.size === 'string') {
      opts.size = sizeNameToNumber[opts.size]
    }
    this.size = opts.size
    this.path.setAttribute('d', createArrowDPathAttribute(96, 128, this.strokeWidth, this.distance))

    this.pointerElement.style.fill = this.fillColor
    this.pointerElement.style.stroke = this.strokeColor
    this.pointerElement.style.strokeWidth = `${this.strokeWidth == 0 ? 'none' : this.strokeWidth}`

    this.pointerElement.style.transformOrigin = 'center left'
    this.pointerElement.style.transform = `translateY(-50%) rotate(${this.fromAngle}deg) scale(${this.size})`
    this.pointerElement.setAttribute('width', `${128 + this.strokeWidth + this.distance}`)
    this.pointerElement.setAttribute('height', `${96 + this.strokeWidth}`)

    this.update()
  }

  update(): void {
    const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)

    this.pointerElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.pointerElement.style.top = targetTop + targetRect.height / 2 + 'px'
  }
}
