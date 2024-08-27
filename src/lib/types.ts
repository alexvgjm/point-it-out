import type { ArrowOptions, RectOptions } from './pointers'

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

export interface PointerOptions {
  rect: CommonOptions & SVGOptions & RectOptions
  arrow: CommonOptions & SVGOptions & ArrowOptions
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
