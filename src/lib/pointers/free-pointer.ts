import type {
  FreePointerOptions,
  Origin,
  PointerOptions,
  ResponsiveConfigurationObject,
  ResponsiveMode,
  VirtualTransforms
} from '$lib/types'
import { getAsPercentsNumbers } from '$lib/values'
import { prepareAnimation, type AnimatableOptions } from './animations/animatable'
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
  degsToRads,
  getRectsInfo,
  isRectHorizontallyInsideOther,
  radsToDegs
} from './utils'

export const DEFAULT_RESPONSIVE_OPTIONS: {
  [Key in ResponsiveMode]: ResponsiveConfigurationObject & { type: Key }
} = {
  rotate: { type: 'rotate' },
  scale: { type: 'scale', minScale: 0.25 }
}

export const DEFAULT_FREE_POINTER_OPTIONS: Readonly<
  Omit<FreePointerOptions, 'pointerElement' | 'target'>
> = {
  fromAngle: 45,
  distance: 0,
  scale: 1,
  responsive: false,
  animate: false,
  transformOrigin: 'left'
}

/**
 *
 */
export class FreePointer extends BasePointer {
  /**
   * Applied depending on transformOrigin to rectify the a fromAngle value
   * in a way that fromAngle: 0 always mean looking from right to left
   */
  private baseAngle = 0

  /**
   * Applied when responsive: 'rotate' is used
   */
  private responsiveAngle = 0

  /**
   * Applied when responsive: 'scale' is used
   */
  private responsiveScale = 0

  /**
   * Applied depending on transformOrigin to translate pointerElement
   * in a way that its tip touch target's center (if distance 0).
   */
  private baseTranslation = { x: '0', y: '0' }

  private get angle() {
    return this.fromAngle + this.baseAngle + this.responsiveAngle
  }

  private get scale() {
    return this.responsive && this.responsive.type == 'scale' ? this.responsiveScale : this.size
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

    this.distance = opts.distance
    this.fromAngle = getAngle(opts.fromAngle)
    this.size = getSize(opts.scale)

    const oldWrapper = this.pointerElement.closest('.pio__pointer-wrapper')
    oldWrapper?.remove()

    this.rootElement = createWrapper(opts)
    this.rootElement.appendChild(this.pointerElement)
    this.container.appendChild(this.rootElement)

    this._transformOrigin = getTransformOrigin(opts.transformOrigin)

    this.pointerElement.style.transformOrigin = this._transformOrigin
    this.pointerElement.style.overflow = 'visible'

    this.calculateBaseTranslation()
    this.calculateBaseAngleBasedOnTransformOrigin()
    this.transform = {
      translate: {
        x: this.baseTranslation.x + '%',
        y: this.baseTranslation.y + '%'
      },
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
    if (opts.animate) {
      prepareAnimation(this, opts.animate)
    }

    this.update()
  }

  private clearPointerElementPositionStyles() {
    const propsToClear = ['left', 'top', 'transform']
    propsToClear.forEach((p) => this.pointerElement.style.removeProperty(p))
  }

  update(): void {
    this.clearPointerElementPositionStyles()

    const rectsInfo = getRectsInfo(this.target, this.container)
    const { targetRect, targetTop, targetLeft } = rectsInfo

    this.rootElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.rootElement.style.top = targetTop + targetRect.height / 2 + 'px'

    if (this.responsive) {
      if (this.responsive.type == 'rotate') {
        this.responsiveRotationUpdate(rectsInfo.containerRect)
      } else if (this.responsive.type == 'scale') {
        this.responsiveScaleUpdate(rectsInfo.containerRect)
      }
    }
    this.calculateBaseTranslation()
    this.transform = {
      ...this.transform,
      translate: { ...this.baseTranslation },
      rotate: this.angle,
      scale: this.scale
    }
    applyVirtualTransform(this.transform!, this.pointerElement)
  }

  private calculateBaseAngleBasedOnTransformOrigin() {
    const { x, y } = getAsPercentsNumbers(this._transformOrigin)
    const xUnit = (x - 50) / 50
    const yUnit = (y - 50) / 50
    this.baseAngle = radsToDegs(Math.atan2(yUnit, xUnit)) - 180
  }

  private calculateBaseTranslation() {
    const { x, y } = getAsPercentsNumbers(this._transformOrigin)

    let offX = 0
    let offY = 0

    if (this.distance) {
      const angRads = degsToRads(this.angle)
      const xUnit = Math.cos(angRads)
      const yUnit = Math.sin(angRads)
      const rect = this.pointerElement.getBoundingClientRect()
      offX = ((this.distance * xUnit) / rect.width) * 100
      offY = ((this.distance * yUnit) / rect.height) * 100
    }

    this.baseTranslation = {
      x: (offX - x).toFixed(2) + '%',
      y: (offY - y).toFixed(2) + '%'
    }
  }

  /**
   * @returns true if updated
   */
  responsiveScaleUpdate(containerRect: DOMRect) {
    this.transform = {
      ...this.transform,
      scale: this.size,
      rotate: this.angle
    }

    applyVirtualTransform(this.transform, this.pointerElement)
    const pRect = this.pointerElement.getBoundingClientRect()

    if (isRectHorizontallyInsideOther(pRect, containerRect)) {
      return false
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

    this.responsiveScale = Math.max(config.minScale, this.size * (1 - percent))
    return true
  }

  /**
   * @returns true if updated
   */
  responsiveRotationUpdate(containerRect: DOMRect) {
    this.responsiveAngle = 0 // Get original rect without responsive adjust
    const withoutResponsive = {
      ...this.transform,
      rotate: this.angle
    }
    applyVirtualTransform(withoutResponsive, this.pointerElement)
    const pointerRect = this.pointerElement.getBoundingClientRect()

    if (isRectHorizontallyInsideOther(pointerRect, containerRect)) {
      return false
    }

    const fromTop = this.angle < 0 || this.angle >= 180
    const fromLeft = this.angle > 90 && this.angle <= 270
    const dx = fromLeft
      ? containerRect.left - pointerRect.left
      : pointerRect.right - containerRect.right

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

    this.responsiveAngle = rotate
    return true
  }
}
