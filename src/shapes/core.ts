import { CommonOptions, ShapeName } from "../types";

export const commonOpiontsDefaults: Partial<CommonOptions> = {
    strokeColor: 'orange',
    strokeWidth: 4,
    className: undefined
}

function createParentSVG(options: CommonOptions) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const opts = { ...commonOpiontsDefaults, ...options } as Required<CommonOptions>

    svg.style.zIndex = '9999'
    svg.style.position = 'absolute'
    svg.style.stroke = opts.strokeColor
    svg.style.fill = 'none'

    if (opts.className) { svg.classList.add(opts.className) }

    svg.style.strokeWidth = opts.strokeWidth + 'px'
    return svg
}

export function createSVG<T = SVGElement>(tag: string) {
    return document.createElementNS('http://www.w3.org/2000/svg', tag) as T
}

function getTarget(selectorOrTarget: HTMLElement | string | null) {
    if (typeof selectorOrTarget == 'string') {
        return document.querySelector(selectorOrTarget) as HTMLElement
    }

    return selectorOrTarget
}

export const availableShapes: ShapeName[] = ['square']

export abstract class PointItOutShape {
    strokeWidth: number
    strokeColor: string
    target: HTMLElement
    svg: SVGElement

    constructor(options: CommonOptions) {
        const opts = { ...commonOpiontsDefaults, ...options } as Required<CommonOptions>
        this.strokeWidth = opts.strokeWidth
        this.strokeColor = opts.strokeColor
        const target = getTarget(options.target)
        if (!target) {
            throw new Error(
                `PointItOut: Target is ${target}. Check target option.`
            )
        }
        this.target = target
        this.svg = createParentSVG(options)
    }

    abstract onResize(): void
}


/*class PointItOutBase {
    resizeListener: () => void
    created: { svg: SVGElement, target: HTMLElement, }[] = []

    constructor() {
        this.resizeListener = () => {

        }
        window.addEventListener('resize', this.resizeListener)
    }
}*/