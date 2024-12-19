import type {
  FreePointerOptions,
  PointerOptions,
  ResponsiveConfigurationObject,
  ResponsiveMode,
  VirtualTransforms
} from '$lib/types'
import type { AnimatableOptions } from './animations/animatable'
import { BasePointer, createWrapper, getAngle, getSize, getTarget } from './core'
import {
  applyVirtualTransform,
  getRectsInfo,
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
  pointerTip: 'top left'
})

export class FreePointer extends BasePointer {
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

    this.rootElement = createWrapper(opts)
    this.rootElement.style.transformOrigin = 'top left'
    this.rootElement.appendChild(this.pointerElement)
    this.container.appendChild(this.rootElement)

    this.size = getSize(opts.size)
    this.fromAngle = getAngle(opts.fromAngle)
    this.distance = opts.distance

    this.pointerElement.style.paddingLeft = `${this.distance}px`
    this.pointerElement.style.boxSizing = 'content-box'
    this.pointerElement.style.overflow = 'visible'

    this.transform = {
      scale: this.size,
      rotate: this.fromAngle
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

    applyVirtualTransform(this.transform!, this.pointerElement)
  }

  responsiveScaleUpdate({ containerRect }: RectsInfo) {
    this.transform = {
      ...this.transform,
      scale: this.size,
      rotate: this.fromAngle
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

    const mod90 = this.fromAngle % 90
    const hAngle = Math.min(mod90, 90 - mod90)
    const percent = dx / (pRect.width * Math.cos((hAngle / 180) * Math.PI))
    const config = this.responsive as { minScale: number }
    this.transform = {
      ...this.transform,
      scale: Math.max(config.minScale, this.size * (1 - percent)),
      rotate: this.fromAngle
    }
  }

  responsiveRotationUpdate({ containerRect }: RectsInfo) {
    this.transform = { ...this.transform, rotate: this.fromAngle }
    applyVirtualTransform(this.transform, this.pointerElement)
    const pRect = this.pointerElement.getBoundingClientRect()

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
