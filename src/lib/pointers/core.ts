import { originToAngle, namedOriginToComponents, sizeNameToNumber } from '$lib/values'
import type {
  CommonOptions,
  PIOEventName,
  PIOPointerEvents,
  PointerName,
  PointItOutPointer,
  SVGOptions,
  NamedScale,
  NamedOrigin,
  TransformOriginOption,
  Origin,
  OriginX,
  Percent,
  OriginY
} from '../types'

// FIXME: container: document.body
// Default at constructor to avoid PlayWright environmnet
// without document. Maybe should use a init function?
export const DEFAULT_COMMON_OPTIONS: Partial<CommonOptions> = Object.freeze({
  className: undefined,
  zIndex: 9999
  // container: document.body
})

export const DEFAULT_SVG_OPTIONS: Required<SVGOptions> = Object.freeze({
  strokeColor: 'darkorange',
  fillColor: 'orange',
  strokeWidth: 4
})

export function createWrapper(options: CommonOptions) {
  const wrapper = document.createElement('div')

  const opts = {
    ...DEFAULT_COMMON_OPTIONS,
    ...options
  }

  wrapper.style.zIndex = opts.zIndex!.toString()
  wrapper.style.position = 'absolute'

  if (opts.className) {
    wrapper.classList.add(opts.className)
  }

  return wrapper
}

export function createParentSVG(options: CommonOptions & SVGOptions, isRoot = false) {
  const opts = {
    ...DEFAULT_COMMON_OPTIONS,
    ...DEFAULT_SVG_OPTIONS,
    ...options
  } as Required<CommonOptions & SVGOptions>

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  if (isRoot) {
    svg.style.position = 'absolute'
    if (opts.className) {
      svg.classList.add(opts.className)
    }
  }
  svg.style.zIndex = options.zIndex!.toString()

  svg.style.stroke = opts.strokeColor
  svg.style.fill = opts.fillColor
  svg.style.strokeWidth = `${opts.strokeWidth}`
  svg.style.pointerEvents = 'none'
  svg.style.strokeLinejoin = 'round'
  svg.style.strokeLinecap = 'round'
  svg.style.strokeWidth = opts.strokeWidth + 'px'
  return svg
}

export function createSVG<T = SVGElement>(tag: string) {
  return document.createElementNS('http://www.w3.org/2000/svg', tag) as T
}
export function getAngle(value: number | NamedOrigin) {
  return typeof value === 'number' ? value : originToAngle[value]
}
export function getSize(value: number | NamedScale) {
  return typeof value === 'number' ? value : sizeNameToNumber[value]
}

export function getTransformOrigin(value: TransformOriginOption): Origin {
  if (typeof value === 'string') {
    return namedOriginToComponents[value]
  }

  const x: OriginX | Percent = typeof value.x == 'number' ? `${value.x}%` : value.x

  const y: OriginY | Percent = typeof value.y == 'number' ? `${value.y}%` : value.y

  return `${x} ${y}`
}

export function getTarget(selectorOrTarget: HTMLElement | SVGSVGElement | string | null) {
  if (typeof selectorOrTarget == 'string') {
    return document.querySelector(selectorOrTarget) as HTMLElement
  }

  return selectorOrTarget
}

export const availablePointers: Readonly<PointerName[]> = ['rect', 'arrow']

export abstract class BasePointer implements PointItOutPointer {
  abstract rootElement: PointItOutPointer['rootElement']

  destroyed = false
  target
  container
  listeners: {
    [PIOEvent in PIOEventName]?: ((payload: PIOPointerEvents[PIOEventName]) => void)[] | undefined
  }

  constructor(options: CommonOptions) {
    const opts = { ...DEFAULT_COMMON_OPTIONS, ...options } as Required<CommonOptions>
    const container = getTarget(opts.container || document.body)
    if (!container) {
      throw new Error(`PointItOut: container is ${container}. Check container option.`)
    }
    const target = getTarget(options.target)
    if (!target) {
      throw new Error(`PointItOut: Target is ${target}. Check target option.`)
    }
    this.listeners = {}
    this.container = container

    this.target = target
  }

  abstract update(): void

  destroy() {
    if (this.destroyed) {
      throw new Error('Pointer already destroyed')
    }

    this.destroyed = true
    this.rootElement.remove()
    this.listeners.destroy?.forEach((cb) => cb(this))
  }

  on: PointItOutPointer['on'] = (event, cb) => {
    if (this.listeners[event] === undefined) {
      return (this.listeners[event] = [cb])
    }

    if (this.listeners[event].includes(cb)) {
      return
    }

    this.listeners[event].push(cb)
  }
}
