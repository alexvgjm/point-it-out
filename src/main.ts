import { ShapeOptions } from './types';
import { PIOSquareShape } from './shapes/square';
import { PointItOutShape } from './shapes/core';

const created: PointItOutShape[] = []
const onResize = () => created.forEach(s => s.onResize())

function addOrReadGeneralResizeListener() {
    window.removeEventListener('resize', onResize)
    window.addEventListener('resize', onResize)
}

export function create<ShapeName extends keyof ShapeOptions>(
    shape: ShapeName, options: ShapeOptions[ShapeName]) {
    
    addOrReadGeneralResizeListener()
    let createdShape!: PointItOutShape

    if (shape == 'square') {
        createdShape = new PIOSquareShape(options)
    }

    created.push(createdShape)
}

/**
 * Destroy all SVG and associated listeners.
 * This function is designed to avoid memory leaks or other problems, specially
 * when used in SPA or while testing.
 */
export function clear() {
    window.removeEventListener('resize', onResize)
    created.forEach(s => s.svg.remove())
    created.length = 0
}