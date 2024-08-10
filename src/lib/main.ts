import { RectPointer } from './shapes/rect'
import { PointItOutPointer } from './shapes/core'
import type { PointerOptions, SystemOptions } from './types'
import { ArrowPointer } from './shapes/arrow'

const created: Set<PointItOutPointer> = new Set()
const onResize = () => {
  update()
}
const onLoad = () => {
  update()
}

let systemOptions: SystemOptions = {
  updateOnResize: true,
  updateAfterLoad: true
}

if (typeof window !== 'undefined') {
  console.log('Point it out init config')
  console.log(config(systemOptions))
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
  // Clear old listeners
  window.removeEventListener('resize', onResize)
  window.removeEventListener('load', onLoad)
  if (systemOptions.updateOnResize) {
    window.addEventListener('resize', onResize)
  }
  if (systemOptions.updateAfterLoad) {
    window.addEventListener('load', onLoad)
  }

  return structuredClone(systemOptions)
}

/**
 * Create a new pointer.
 * @returns reference to a new PointItOutPointer
 */
export function create<PointerName extends keyof PointerOptions>(
  pointerName: PointerName,
  options: PointerOptions[PointerName]
) {
  let createdPointer!: PointItOutPointer

  // Deliberately using explicit if-casing instead mappings
  if (pointerName == 'rect') {
    createdPointer = new RectPointer(options)
  } else if (pointerName == 'arrow') {
    createdPointer = new ArrowPointer(options)
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
