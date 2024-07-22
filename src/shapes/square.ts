import { commonOpiontsDefaults, PointItOutShape } from "./core"
import { ShapeOptions } from "../types"

const squareOptionsDefaults: Partial<ShapeOptions['square']> = {
    ...commonOpiontsDefaults,
    // TODO: round option
}

export class PIOSquareShape extends PointItOutShape {
    constructor(options: ShapeOptions['square']) {
        super(options)

        const opts = { ...squareOptionsDefaults, ...options } as Required<ShapeOptions['square']>
        const strW = opts.strokeWidth

        const htmlRect = this.target.getBoundingClientRect()
        const width = htmlRect.width + (strW * 2)
        const height = htmlRect.height + (strW * 2)

        this.svg.setAttribute('width', width.toString())
        this.svg.setAttribute('height', height.toString())
        this.svg.style.left = (htmlRect.left - strW) + 'px'
        this.svg.style.top = (htmlRect.top - strW) + 'px'

        const offset = Math.round(strW / 2)
        this.svg.innerHTML = `<rect x="${offset}" y="${offset}" `
            + `width="${width - strW}"`
            + `height="${height - strW}"/>`

        document.body.appendChild(this.svg)
    }

    onResize(): void {
        // TODO: 
    }
}