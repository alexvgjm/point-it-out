import { commonOpiontsDefaults, createSVG, PointItOutShape } from "./core"
import { ShapeOptions } from "../types"

const roundOptionsDefaults: Partial<ShapeOptions['round']> = {
    ...commonOpiontsDefaults,
    // TODO: gap option
}


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

        const sw = this.strokeWidth
        const w = rect.width
        const h = rect.height
        const aspect = w / h
        const max = Math.max(w, h)
        const diam = Math.round(Math.sqrt(max*max + max*max))

        let rLeft = rect.left + (max - diam)/2              -sw/2
        let rTop =  rect.top  + (max - diam)/2 / aspect     -sw/2
        let svgHeight = Math.ceil(diam/aspect + sw)
        let svgWidth  = Math.ceil(diam + sw)

        if (aspect < 1) {
            rLeft = rect.left + (max - diam)/2 * aspect  -sw/2
            rTop =  rect.top  + (max - diam)/2           -sw/2
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