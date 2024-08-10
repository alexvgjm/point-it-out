export type SystemOptions = {
  updateOnResize: boolean
  updateAfterLoad: boolean
}

export type CommonOptions = {
  target: string | HTMLElement
  className?: string

  /**
   * Container where append the pointer. NOTE: The container should have
   * a relative or absolute position CSS property.
   */
  container?: string | HTMLElement
  zIndex?: number
}

export type SVGOptions = {
  /** Only pixels allowed ATM */
  strokeWidth?: number
  strokeColor?: string
  fillColor?: string
}

export type RectOptions = {
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

export type Origin =
  | number
  | 'right'
  | 'top-right'
  | 'top'
  | 'top-left'
  | 'left'
  | 'bottom-left'
  | 'bottom'
  | 'bottom-right'

export type ArrowOptions = {
  from?: number | Origin
}

export type PointerOptions = {
  rect: CommonOptions & SVGOptions & RectOptions
  arrow: CommonOptions & SVGOptions & ArrowOptions
}

export type PointerName = keyof PointerOptions
