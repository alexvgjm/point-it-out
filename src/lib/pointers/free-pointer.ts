import type {
  FreePointerOptions,
  Origin,
  OriginX,
  OriginY,
  Percent,
  PointerOptions,
  ResponsiveConfigurationObject,
  ResponsiveMode,
  VirtualTransforms
} from '$lib/types'
import {
  convertFromPercentToUnitSpace,
  namedXToStringPercent,
  namedYToStringPercent
} from '$lib/values'
import type { AnimatableOptions } from './animations/animatable'
import {
  BasePointer,
  createWrapper,
  getAngle,
  getSize,
  getTarget,
  getTransformOrigin
} from './core'
import {
  applyVirtualTransform,
  getRectsInfo,
  isPercent,
  isRectHorizontallyInsideOther,
  type RectsInfo
} from './utils'

export const DEFAULT_RESPONSIVE_OPTIONS: {
  [Key in ResponsiveMode]: ResponsiveConfigurationObject & { type: Key }
} = {
  rotate: { type: 'rotate' },
  scale: { type: 'scale', minScale: 0.25 }
}

export const DEFAULT_FREE_POINTER_OPTIONS: Readonly<
  Omit<FreePointerOptions, 'pointerElement' | 'target'>
> = Object.freeze({
  fromAngle: 45,
  distance: 0,
  size: 1,
  responsive: false,
  animate: false,
  transformOrigin: 'left top'
})

export class FreePointer extends BasePointer {
  /**
   * Applied depending on transformOrigin to rectify the a fromAngle value
   * in a way that fromAngle: 0 always mean looking from right to left
   */
  private baseAngle = 0

  private get angle() {
    console.log(this.fromAngle, this.baseAngle, this.fromAngle + this.baseAngle)
    return this.fromAngle + this.baseAngle
  }

  rootElement: HTMLElement | SVGSVGElement

  /**
   * The HTMLElement used as a pointer, controller by this object. Will be
   * wrapped by the rootElement.
   */
  pointerElement: HTMLElement | SVGSVGElement

  animate?: false | AnimatableOptions<'pulse'> = false
  responsive?: false | ResponsiveConfigurationObject

  /**
   * This transforms will be applied to pointerElement (not rootElement)
   * Animations and custom animations (transforms via CSS) will be applied to
   * the wrapper rootElement not using this transform.
   */
  transform?: VirtualTransforms

  _transformOrigin: Origin

  size: number
  fromAngle: number
  distance: number

  constructor(options: PointerOptions['free']) {
    const opts = {
      ...DEFAULT_FREE_POINTER_OPTIONS,
      ...options
    } as Required<PointerOptions['free']>
    super(opts)

    this.pointerElement = getTarget(opts.pointerElement)!
    if (!this.pointerElement) {
      throw new Error(
        `PointItOut: pointerElement is ${this.pointerElement}. ` + `Check pointerElement option.`
      )
    }

    this._transformOrigin = getTransformOrigin(opts.transformOrigin)
    this.rootElement = createWrapper(opts)
    this.pointerElement.style.transformOrigin = this._transformOrigin
    this.rootElement.appendChild(this.pointerElement)
    this.container.appendChild(this.rootElement)

    this.size = getSize(opts.size)
    this.fromAngle = getAngle(opts.fromAngle)
    this.distance = opts.distance

    this.pointerElement.style.boxSizing = 'content-box'
    this.pointerElement.style.overflow = 'visible'

    this.calculateBaseAngle()

    this.transform = {
      scale: this.size,
      rotate: this.angle
    }

    if (!opts.responsive) {
      this.responsive = false
    } else if (typeof opts.responsive === 'object') {
      this.responsive = {
        ...DEFAULT_RESPONSIVE_OPTIONS[opts.responsive.type],
        ...opts.responsive
      }
    } else {
      // 'scale' | 'rotate'
      this.responsive = {
        ...DEFAULT_RESPONSIVE_OPTIONS[opts.responsive]
      }
    }
  }

  update(): void {
    const rectsInfo = getRectsInfo(this.target, this.container)
    const { targetRect, targetTop, targetLeft } = rectsInfo

    this.rootElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.rootElement.style.top = targetTop + targetRect.height / 2 + 'px'

    if (this.responsive) {
      if (this.responsive.type == 'rotate') {
        this.responsiveRotationUpdate(rectsInfo)
      } else if (this.responsive.type == 'scale') {
        this.responsiveScaleUpdate(rectsInfo)
      }
    }

    this.transform = {
      ...this.transform,
      translate: {
        y: this.transform?.translate?.y ?? '0',
        x: this.distance + 'px'
      }
    }
    applyVirtualTransform(this.transform!, this.pointerElement)
  }

  private calculateBaseAngle() {
    let [xPer, yPer] = this._transformOrigin.split(' ') as [OriginX | Percent, OriginY | Percent]

    if (!isPercent(xPer)) {
      xPer = namedXToStringPercent[xPer]
    }
    if (!isPercent(yPer)) {
      yPer = namedYToStringPercent[yPer]
    }

    const x = convertFromPercentToUnitSpace(xPer)
    const y = convertFromPercentToUnitSpace(yPer)

    // Base on origin, determine how much angle to sub or add to adjust so
    // So fromAngle: 0 always means looking to the left from the right
    this.baseAngle = (90 + (Math.atan2(x, y) * 180) / Math.PI) % 360
  }

  responsiveScaleUpdate({ containerRect }: RectsInfo) {
    this.transform = {
      ...this.transform,
      scale: this.size,
      rotate: this.angle
    }

    applyVirtualTransform(this.transform, this.pointerElement)
    const pRect = this.pointerElement.getBoundingClientRect()

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

    const mod90 = this.angle % 90
    const hAngle = Math.min(mod90, 90 - mod90)
    const percent = dx / (pRect.width * Math.cos((hAngle / 180) * Math.PI))
    const config = this.responsive as { minScale: number }
    this.transform = {
      ...this.transform,
      scale: Math.max(config.minScale, this.size * (1 - percent)),
      rotate: this.angle
    }
  }

  responsiveRotationUpdate({ containerRect }: RectsInfo) {
    this.transform = { ...this.transform, rotate: this.angle }
    applyVirtualTransform(this.transform, this.pointerElement)
    const pRect = this.pointerElement.getBoundingClientRect()

    if (isRectHorizontallyInsideOther(pRect, containerRect)) {
      return
    }

    const fromTop = this.angle < 0 || this.angle >= 180
    const fromLeft = this.angle > 90 && this.angle <= 270
    const dx = fromLeft ? containerRect.left - pRect.left : pRect.right - containerRect.right

    let excessFactor = 1 - dx / (containerRect.width / 2)
    excessFactor = Math.min(1, Math.max(-1, excessFactor))

    let rotate = Math.acos(excessFactor) * (180 / Math.PI)
    if ((fromTop && !fromLeft) || (fromLeft && !fromTop)) {
      rotate = -rotate
    }

    if (fromLeft) {
      if (fromTop) {
        rotate = Math.min(rotate, 270 - this.angle)
      } else {
        rotate = Math.max(rotate, 90 - this.angle)
      }
    } else {
      if (fromTop) {
        rotate = Math.max(rotate, 270 - this.angle)
      } else {
        rotate = Math.min(rotate, 90 - this.angle)
      }
    }

    this.transform = { ...this.transform, rotate: this.angle + rotate }
  }
}
