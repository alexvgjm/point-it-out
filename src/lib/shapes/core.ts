import type { CommonOptions, PointerName } from '../types'

export const commonOptionsDefaults: Partial<CommonOptions> = {
  strokeColor: 'orange',
  strokeWidth: 4,
  padding: 0,
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
  strokeWidth: number
  strokeColor: string
  padding: number
  target: HTMLElement
  svg: SVGElement
  container: HTMLElement

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
    this.padding = opts.padding

    this.target = target
    this.svg = createParentSVG(options)
  }

  /**
   * Updates the shape to fit its target element. onResize shoud call it by
   * default, but must be called manually if the position or size of the
   * target element changes for some other reason.
   */
  abstract update(): void
}
