import { createSVG, PointItOutShape } from "./core"
import { ShapeOptions } from "../types"

// TODO: only if some shape specific option added
/*const roundOptionsDefaults: Partial<ShapeOptions['round']> = {
    ...commonOpiontsDefaults,
}*/


export class PIORoundShape extends PointItOutShape {
    ellipseElm: SVGEllipseElement

    constructor(options: ShapeOptions['round']) {
        super(options)
        this.ellipseElm = createSVG('ellipse')
        this.svg.appendChild(this.ellipseElm)
        document.body.appendChild(this.svg)
        this.update()
    }

    update(): void {
        const svg = this.svg
        const eli = this.ellipseElm
        const rect = this.target.getBoundingClientRect()

        const pad = this.padding
        const sw = this.strokeWidth
        const w = rect.width
        const h = rect.height
        const aspect = w / h
        const max = Math.max(w, h)
        const diam = Math.round(Math.sqrt(max*max + max*max))
        const targetTop  = rect.top + scrollY
        const targetLeft = rect.left + scrollX

        let rTop      = targetTop  + (max - diam)/2/ aspect   -sw/2   -pad
        let rLeft     = targetLeft + (max - diam)/2           -sw/2   -pad
        let svgHeight = Math.ceil(diam/aspect + sw) + pad*2
        let svgWidth  = Math.ceil(diam        + sw) + pad*2

        if (aspect < 1) {
            rTop =  targetTop  + (max - diam)/2           -sw/2
            rLeft = targetLeft + (max - diam)/2 * aspect  -sw/2
            svgHeight = Math.ceil(diam + sw)
            svgWidth  = Math.ceil(diam*aspect + sw)
        }

        svg.setAttribute('width',   `${svgWidth}`)
        svg.setAttribute('height',  `${svgHeight}`)
        eli.setAttribute('cx',      `${svgWidth/2}`)
        eli.setAttribute('cy',      `${svgHeight/2}`)
        eli.setAttribute('ry',      `${svgHeight/2 - sw/2}`)
        eli.setAttribute('rx',      `${svgWidth/2 - sw/2}`)
        svg.style.left = rLeft + 'px'
        svg.style.top = rTop + 'px'
    }
    onResize(): void {
        this.update()
    }
}