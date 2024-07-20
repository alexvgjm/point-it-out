import { CommonOptions } from "./types";


const commonOpiontsDefaults: Partial<CommonOptions> = {
    strokeColor: 'orange',
    strokeWidth: 4,
    className: undefined
}

function createParentSVG(options: CommonOptions) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    const opts = {...commonOpiontsDefaults, ...options} as Required<CommonOptions>

    svg.style.zIndex = '9999'
    svg.style.position = 'absolute'
    svg.style.stroke = opts.strokeColor
    svg.style.fill = 'none'

    if (opts.className) { svg.classList.add(opts.className) }

    svg.style.strokeWidth = opts.strokeWidth + 'px'
    return svg
}

function createSVG<T = SVGElement>(tag: string) {    
    return document.createElementNS('http://www.w3.org/2000/svg', tag) as T
}

function getTarget(selectorOrTarget: HTMLElement | string | null) {
    if (typeof selectorOrTarget == 'string') {
        return document.querySelector(selectorOrTarget) as HTMLElement
    }

    return selectorOrTarget
}


export function squareIt(options: CommonOptions) {
    let target = getTarget(options.target)
    if (!target) { return }

    const svg = createParentSVG(options)
    const opts = {...commonOpiontsDefaults, ...options} as Required<CommonOptions>
    const strW = opts.strokeWidth

    const htmlRect = target.getBoundingClientRect()
    const width = htmlRect.width + (strW * 2)
    const height = htmlRect.height + (strW * 2)
    
    svg.setAttribute('width', width.toString())
    svg.setAttribute('height', height.toString())
    svg.style.left = (htmlRect.left - strW) + 'px'
    svg.style.top = (htmlRect.top - strW) + 'px'
    
    const offset = Math.round(strW / 2)
    svg.innerHTML =  `<rect x="${offset}" y="${offset}" `
                    + `width="${width - strW}"`
                    + `height="${height - strW}"/>`
       
    document.body.appendChild(svg)
}