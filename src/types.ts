export type CommonOptions = {
    target: string | HTMLElement,
    className?: string,

    /** Only pixels allowed ATM */
    strokeWidth?: number,
    strokeColor?: string

    /* space between shape and content. Can be negative. Default: 0*/
    padding?: number
}

export type ShapeOptions = {
    'square': {} & CommonOptions, // No options beside commons ATM
    'round': {} & CommonOptions // No options beside commons ATM
}

export type ShapeName = keyof ShapeOptions