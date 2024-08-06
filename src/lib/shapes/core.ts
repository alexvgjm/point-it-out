import type { CommonOptions, PointerName } from '../types'

export const commonOptionsDefaults: Partial<CommonOptions> = {
  strokeColor: 'orange',
  strokeWidth: 4,
  padding: { x: 0, y: 0 },
  className: undefined,
  zIndex: 9999
  // FIXME: container default initialization to avoid PlayWright environmnet
  //		  without document init. Maybe should use a init function?
  //container: document.body
}

function createParentSVG(options: CommonOptions) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const opts = { ...commonOptionsDefaults, ...options } as Required<CommonOptions>

  svg.style.zIndex = opts.zIndex!.toString()
  svg.style.position = 'absolute'
  svg.style.stroke = opts.strokeColor
  svg.style.fill = 'none'
  svg.style.pointerEvents = 'none'

  if (opts.className) {
    svg.classList.add(opts.className)
  }

  svg.style.strokeWidth = opts.strokeWidth + 'px'
  return svg
}

export function createSVG<T = SVGElement>(tag: string) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag) as T
}

function getTarget(selectorOrTarget: HTMLElement | string | null) {
  if (typeof selectorOrTarget == 'string') {
    return document.querySelector(selectorOrTarget) as HTMLElement
  }

  return selectorOrTarget
}

export const availableShapes: Readonly<PointerName[]> = ['rect']

export abstract class PointItOutPointer {
  destroyed: boolean = false

  strokeWidth: number
  strokeColor: string
  padding: { x: number; y: number }
  target: HTMLElement

  /** The absolutely positioned DOM element */
  htmlElement: HTMLElement | SVGElement

  /** The htmlElement parent */
  container: HTMLElement

  /**
   * If this pointer is destroyed, all listeners/callbacks register here
   * will be called.
   */
  onDestroyListeners: ((pointer: PointItOutPointer) => void)[] = []

  constructor(options: CommonOptions) {
    const opts = { ...commonOptionsDefaults, ...options } as Required<CommonOptions>
    const container = getTarget(opts.container || document.body)
    if (!container) {
      throw new Error(`PointItOut: container is ${container}. Check container option.`)
    }
    const target = getTarget(options.target)
    if (!target) {
      throw new Error(`PointItOut: Target is ${target}. Check target option.`)
    }
    this.container = container
    this.strokeWidth = opts.strokeWidth
    this.strokeColor = opts.strokeColor
    if (typeof opts.padding == 'number') {
      opts.padding = { x: opts.padding, y: opts.padding }
    }

    this.padding = { x: opts.padding.x ?? 0, y: opts.padding.y ?? 0 }

    this.target = target
    this.htmlElement = createParentSVG(options)
  }

  /**
   * Updates the shape to fit its target element. onResize shoud call it by
   * default, but must be called manually if the position or size of the
   * target element changes for some other reason.
   */
  abstract update(): void

  /**
   * Destroy the current Pointer and created elements.
   */
  destroy() {
    if (this.destroyed) {
      throw new Error('Pointer already destroyed')
    }

    this.destroyed = true
    this.htmlElement.remove()
    this.onDestroyListeners.forEach((cb) => cb(this))
  }

  /**
   * Register a listener/callback to notify when this Pointer is destroyed
   * @param cb a function to call when this pointer is destroyed
   */
  onDestroy(cb: (pointer: PointItOutPointer) => void) {
    this.onDestroyListeners.push(cb)
  }
}
