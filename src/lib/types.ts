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

  /** Only pixels allowed ATM */
  strokeWidth?: number
  strokeColor?: string

  /** Space between stroke and content. Can be negative. Default: 0*/
  padding?:
    | number
    | {
        /** Horizontal gap (left and right) */
        x?: number
        /** Vertical gap (top and bottom) */
        y?: number
      }

  zIndex?: number
}

export type PointerOptions = {
  rect: { round?: number | string | { rx: number | string; ry: number | string } } & CommonOptions
  image: {} & CommonOptions // No options beside commons ATM
}

export type PointerName = keyof PointerOptions
