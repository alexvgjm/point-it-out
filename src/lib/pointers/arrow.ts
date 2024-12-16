import { commonSVGOptionsDefaults, createParentSVG, createSVG, SVGBasePointer } from './core'
import type { ArrowOptions, PointerOptions, ResponsiveArrowFields, SVGOptions } from '../types'
import { getRectsInfo, isRectHorizontallyInsideOther, type RectsInfo } from './utils'
import { sizeNameToNumber, originToAngleMap } from '../values'
import type { Animatable, AnimatableOptions } from './animations/animatable'
import { prepareArrowAnimation } from './animations/arrow-animations'

export type ArrowAnimation = 'pulse'

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

const arrowDefaults: Readonly<Required<SVGOptions & ArrowOptions>> = Object.freeze({
  ...commonSVGOptionsDefaults,
  strokeWidth: 0,
  fromAngle: 45,
  distance: 0,
  size: 1,
  responsive: false,
  animate: false
})

export class ArrowPointer extends SVGBasePointer implements Animatable<ArrowAnimation> {
  pointerElement: HTMLElement | SVGSVGElement
  path: SVGPathElement
  svg: SVGSVGElement

  fromAngle: number
  distance: number
  size: number

  animate?: false | AnimatableOptions<'pulse'> = false
  responsive?: ResponsiveArrowFields

  constructor(options: PointerOptions['arrow']) {
    const opts = { ...arrowDefaults, ...options } as Required<PointerOptions['arrow']>
    super(opts)
    const g = createSVG<SVGGElement>('g')
    this.path = createSVG<SVGPathElement>('path')
    g.appendChild(this.path)
    this.pointerElement = createParentSVG(opts, true)
    this.svg = this.pointerElement.querySelector('svg')!
    this.svg.appendChild(g)

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

    this.responsive = false
    if (typeof opts.responsive === 'object') {
      this.responsive = opts.responsive as ResponsiveArrowFields & object
    } else if (typeof opts.responsive !== 'boolean') {
      this.responsive = { type: opts.responsive } as ResponsiveArrowFields & object
      if (this.responsive.type == 'scale' && !this.responsive.minSize) {
        this.responsive.minSize = 0.25
      }
    }

    this.svg.style.fill = this.fillColor
    this.svg.style.stroke = this.strokeColor
    this.svg.style.strokeWidth = `${this.strokeWidth == 0 ? 'none' : this.strokeWidth}`
    this.svg.style.transformOrigin = 'center left'
    this.transform = {
      translate: { y: '-50%' },
      rotate: this.fromAngle,
      scale: this.size
    }
    this.svg.setAttribute('width', `${128 + this.strokeWidth + this.distance}`)
    this.svg.setAttribute('height', `${96 + this.strokeWidth}`)
    this.applyTransform(this.svg)

    this.pointerElement.style.transformOrigin = 'top left'
    if (opts.animate) {
      prepareArrowAnimation(this, opts.animate)
    }
    this.update()
  }

  update(): void {
    const rectsInfo = getRectsInfo(this.target, this.container)
    const { targetRect, targetTop, targetLeft } = rectsInfo

    this.pointerElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.pointerElement.style.top = targetTop + targetRect.height / 2 + 'px'

    if (this.responsive) {
      if (this.responsive.type == 'rotate') {
        this.responsiveRotationUpdate(rectsInfo)
      } else if (this.responsive.type == 'scale') {
        this.responsiveScaleUpdate(rectsInfo)
      }
    }

    this.applyTransform(this.svg)
    const pRect = this.pointerElement.getBoundingClientRect()
    console.log(pRect.width)
  }

  responsiveScaleUpdate({ containerRect }: RectsInfo) {
    this.transform = {
      ...this.transform,
      scale: this.size,
      rotate: this.fromAngle
    }
    this.applyTransform(this.svg)
    const pRect = this.svg.getBoundingClientRect()

    if (isRectHorizontallyInsideOther(pRect, containerRect)) {
      return
    }

    let dx = 0
    if (pRect.right > containerRect.right) {
      dx += pRect.right - containerRect.right
    }

    if (pRect.left < containerRect.left) {
      dx += containerRect.left - pRect.left
    }

    const mod90 = this.fromAngle % 90
    const hAngle = Math.min(mod90, 90 - mod90)
    const percent = dx / (pRect.width * Math.cos((hAngle / 180) * Math.PI))
    const config = this.responsive as { minSize: number }
    this.transform = {
      ...this.transform,
      scale: Math.max(config.minSize, this.size * (1 - percent)),
      rotate: this.fromAngle
    }
  }

  responsiveRotationUpdate({ containerRect }: RectsInfo) {
    this.transform = { ...this.transform, rotate: this.fromAngle }
    this.applyTransform(this.svg)
    const pRect = this.svg.getBoundingClientRect()

    if (isRectHorizontallyInsideOther(pRect, containerRect)) {
      return
    }

    const fromTop = this.fromAngle < 0 || this.fromAngle >= 180
    const fromLeft = this.fromAngle > 90 && this.fromAngle <= 270
    const dx = fromLeft ? containerRect.left - pRect.left : pRect.right - containerRect.right

    let excessFactor = 1 - dx / (containerRect.width / 2)
    excessFactor = Math.min(1, Math.max(-1, excessFactor))

    let rotate = Math.acos(excessFactor) * (180 / Math.PI)
    if ((fromTop && !fromLeft) || (fromLeft && !fromTop)) {
      rotate = -rotate
    }

    if (fromLeft) {
      if (fromTop) {
        rotate = Math.min(rotate, 270 - this.fromAngle)
      } else {
        rotate = Math.max(rotate, 90 - this.fromAngle)
      }
    } else {
      if (fromTop) {
        rotate = Math.max(rotate, 270 - this.fromAngle)
      } else {
        rotate = Math.min(rotate, 90 - this.fromAngle)
      }
    }

    this.transform = { ...this.transform, rotate: this.fromAngle + rotate }
  }
}
