import { CommonOptions } from "./types";

function newSvg<T = SVGElement>(svgType = 'svg') {    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', svgType);
    svg.style.zIndex = '-1'
    svg.style.position = 'absolute'
    return svg as T
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

    const svg = newSvg()
    if (options.className) { svg.classList.add(options.className) }

    const htmlRect = target.getBoundingClientRect()
    svg.setAttribute('width', htmlRect.width.toString())
    svg.setAttribute('height', htmlRect.height.toString())
    svg.style.left = (htmlRect.left - 4) + 'px'
    svg.style.top = (htmlRect.top - 4) + 'px'

    const svgRect = newSvg<SVGRectElement>('rect')
    svg.appendChild(svgRect)
    document.body.appendChild(svg)
}