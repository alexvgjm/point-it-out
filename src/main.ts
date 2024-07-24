import { ShapeOptions, SystemOptions } from './types';
import { PIOSquareShape } from './shapes/square';
import { PointItOutShape } from './shapes/core';
import { PIORoundShape } from './shapes/round';

const created: PointItOutShape[] = []
const onResize = () => created.forEach(s => s.onResize())

let systemOptions: SystemOptions = {
    updateOnResize: true
}

function addOrReadGeneralResizeListener() {
    window.removeEventListener('resize', onResize)
    window.addEventListener('resize', onResize)
}

export function config(newOptions: Partial<SystemOptions>) {
    systemOptions = {...systemOptions, ...newOptions}
    if (newOptions.updateOnResize == false) {
        window.removeEventListener('resize', onResize)
    }
}

export function create<ShapeName extends keyof ShapeOptions>(
    shape: ShapeName, options: ShapeOptions[ShapeName]) {
    
    if (systemOptions.updateOnResize) {
        addOrReadGeneralResizeListener()
    }
    let createdShape!: PointItOutShape

    if (shape == 'square') {
        createdShape = new PIOSquareShape(options)
    } else if (shape == 'round') {
        createdShape = new PIORoundShape(options)
    }

    created.push(createdShape)
    return createdShape
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

/**
 * Update all shapes. Call this if the targets elements can change its position
 * or size. If the change is due viewport resize all shapes will be updated
 * except if updateOnResize config option has been set to false.
 */
export function update() {
    created.forEach(s => s.update())
}