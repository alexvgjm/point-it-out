import { CommonOptions } from "./types";

function newSvg(svgType = 'svg') {    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', svgType);
    svg.style.zIndex = '-1'
    svg.style.position = 'absolute'
    return svg
}

export function squareIt(options: CommonOptions) {
    const svg = newSvg()
    document.body.appendChild(svg)
    if (options.className) { svg.classList.add(options.className) }

    let target: HTMLElement | null
    if (typeof options.target == 'string') {
        target = document.querySelector(options.target) as HTMLElement
    } else {
        target = options.target
    }

    if (!target) { return }

    const rect = target.getBoundingClientRect()
    svg.setAttribute('width', rect.width.toString())
    svg.setAttribute('height', rect.height.toString())
    svg.style.left = (rect.left - 4) + 'px'
    svg.style.top = (rect.top - 4) + 'px'
}