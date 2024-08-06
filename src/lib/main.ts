import { RectPointer } from './shapes/rect'
import { PointItOutPointer } from './shapes/core'
import type { ShapeOptions, SystemOptions } from './types'

const created: PointItOutPointer[] = []
const onResize = () => created.forEach((s) => s.update())

let systemOptions: SystemOptions = {
  updateOnResize: true
}

function addOrReAddGeneralResizeListener() {
  window.removeEventListener('resize', onResize)
  window.addEventListener('resize', onResize)
}
/**
 * Modify global options. Only what is specified will be modified.
 * @param newOptions options to modify.
 */
export function config(newOptions: Partial<SystemOptions>) {
  systemOptions = { ...systemOptions, ...newOptions }
  if (newOptions.updateOnResize == false) {
    window.removeEventListener('resize', onResize)
  }
}

/**
 * Create a new pointer.
 * @returns reference to a new PointItOutPointer
 */
export function create<ShapeName extends keyof ShapeOptions>(
  shape: ShapeName,
  options: ShapeOptions[ShapeName]
) {
  if (systemOptions.updateOnResize) {
    addOrReAddGeneralResizeListener()
  }
  let createdShape!: PointItOutPointer

  if (shape == 'rect') {
    createdShape = new RectPointer(options)
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
  created.forEach((s) => s.svg.remove())
  created.length = 0
}

/**
 * Updates all shapes. Call this if the target elements can change its position
 * or size. If the change is due viewport resize you do not need to call this,
 * except if updateOnResize config option has been set to false.
 */
export function update() {
  created.forEach((s) => s.update())
}
