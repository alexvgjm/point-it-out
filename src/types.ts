export type CommonOptions = {
    target: string | HTMLElement,
    className?: string,

    /** Only pixels allowed ATM */
    strokeWidth?: number,
    strokeColor?: string
}

export type ShapeOptions = {
    'square': {} & CommonOptions // No options beside commons ATM
}

export type ShapeName = keyof ShapeOptions