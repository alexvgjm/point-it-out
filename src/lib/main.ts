import { PIORectShape } from './shapes/rect';
import { PointItOutShape } from './shapes/core';
import type { ShapeOptions, SystemOptions } from './types';

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

    if (shape == 'rect') {
        createdShape = new PIORectShape(options)
    }

    created.push(createdShape)
    return createdShape
}

/**
 * Destroy all SVG and associated listeners.
 * This function is designed to avoid memory leaks or other problems, especially
 * when used in SPA or while testing.
 */
export function clear() {
    window.removeEventListener('resize', onResize)
    created.forEach(s => s.svg.remove())
    created.length = 0
}

/**
 * Updates all shapes. Call this if the target elements can change its position
 * or size. If the change is due viewport resize you do not need to call this,
 * except if updateOnResize config option has been set to false.
 */
export function update() {
    created.forEach(s => s.update())
}