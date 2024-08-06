import { RectPointer } from './shapes/rect'
import { PointItOutPointer } from './shapes/core'
import type { PointerOptions, SystemOptions } from './types'

const created: Set<PointItOutPointer> = new Set()
const onResize = () => created.forEach((s) => s.update())

let systemOptions: SystemOptions = {
  updateOnResize: true
}

function addOrReAddGeneralResizeListener() {
  window.removeEventListener('resize', onResize)
  window.addEventListener('resize', onResize)
}

function removePointerFromCreated(pointer: PointItOutPointer) {
  created.delete(pointer)
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
export function create<PointerName extends keyof PointerOptions>(
  pointerName: PointerName,
  options: PointerOptions[PointerName]
) {
  if (systemOptions.updateOnResize) {
    addOrReAddGeneralResizeListener()
  }
  let createdPointer!: PointItOutPointer

  if (pointerName == 'rect') {
    createdPointer = new RectPointer(options)
  }

  createdPointer.onDestroyListeners.push(removePointerFromCreated)
  created.add(createdPointer)
  return createdPointer
}

/**
 * Destroy all SVG.
 * This function is designed to avoid memory leaks or other problems, especially
 * when used in SPA or while testing.
 */
export function clear() {
  window.removeEventListener('resize', onResize)
  created.forEach((p) => p.destroy())
}

/**
 * Updates all shapes. Call this if the target elements can change its position
 * or size. If the change is due viewport resize you do not need to call this,
 * except if updateOnResize config option has been set to false.
 *
 * NOTE: Pointers are stored in a Set with no guaranteed order. If you need to
 * update pointers in a specific order, store its references and update
 * manually via its update method.
 */
export function update() {
  created.forEach((s) => s.update())
}
