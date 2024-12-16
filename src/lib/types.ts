import type { ArrowAnimation, RectAnimation } from './pointers'
import type { Animatable } from './pointers/animations/animatable'

export type NamedSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
export type Origin =
  | 'right'
  | 'top-right'
  | 'top'
  | 'top-left'
  | 'left'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

export interface SystemOptions {
  updateOnResize: boolean
  updateAfterLoad: boolean
}

export interface CommonOptions {
  target: string | HTMLElement
  className?: string

  /**
   * Container where append the pointer. NOTE: The container should have
   * a relative or absolute position CSS property.
   */
  container?: string | HTMLElement
  zIndex?: number
}

export interface SVGOptions {
  /** Only pixels allowed ATM */
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
}

export interface RectOptions {
  /** Space between stroke and content. Can be negative. Default: 0*/
  padding?:
    | number
    | {
        /** Horizontal gap (left and right) */
        x?: number
        /** Vertical gap (top and bottom) */
        y?: number
      }
  round?:
    | number
    | string
    | {
        rx: number | string
        ry: number | string
      }
}

export type ResponsiveArrowOptions =
  | false
  | 'rotate'
  | 'scale'
  | {
      type: 'rotate'
    }
  | {
      type: 'scale'
      minSize?: number
    }

export type ResponsiveArrowFields =
  | false
  | {
      type: 'scale'
      minSize: number
    }
  | {
      type: 'rotate'
    }

export interface ArrowOptions {
  fromAngle?: number | Origin
  distance?: number
  size?: number | NamedSize
  responsive?: ResponsiveArrowOptions
}

export interface PointerOptions {
  rect: CommonOptions & SVGOptions & RectOptions & Animatable<RectAnimation>
  arrow: CommonOptions & SVGOptions & ArrowOptions & Animatable<ArrowAnimation>
}

export interface PIOPointerEvents {
  destroy: PointItOutPointer
}
export type PIOEventName = keyof PIOPointerEvents

export type PointerName = keyof PointerOptions

export interface PointItOutPointer {
  /**
   * true if the pointer have been destroyed. Destroyed
   * pointers has not htmlElement and will not be updated
   */
  destroyed: boolean

  /** The element to point out. */
  target: HTMLElement

  /** The DOM element created by this pointer */
  pointerElement: HTMLElement | SVGSVGElement

  /**
   * The parent element which the pointerElement is a direct child. Should be
   * non-static positioned in order to absolutely position the
   * pointerElement in it.
   */
  container: HTMLElement

  /**
   * Updates the pointer. Must be called if the target element changes its
   * position or size in the container.
   */
  update(): void

  /**
   * Destroy the created element pointer and sets this pointer in an
   * unupdatable state. Emits a 'destroy' event.
   */
  destroy(): void

  /**
   * Register a listener to specific event
   * @param event PointerEvents to listen.
   * @param cb the function to call when the event occurs
   */
  on<E extends PIOEventName>(event: E, cb: (payload: PIOPointerEvents[E]) => void): void
}

export interface PointItOutSVGPointer extends PointItOutPointer {
  /** The width of the stroke to be applied to the SVG */
  strokeWidth: number

  /** The color of the stroke to be applied to the SVG. */
  strokeColor: string

  /** The color used to paint the SVG. */
  fillColor: string
}

export type VirtualTransforms = Readonly<{
  scale?: number
  rotate?: number
  translate?: { x?: string; y?: string }
}>
