import type {
  CommonOptions,
  PIOEventName,
  PIOPointerEvents,
  PointerName,
  PointItOutPointer,
  SVGOptions,
  PointItOutSVGPointer
} from '../types'

// FIXME: container: document.body
// Default at constructor to avoid PlayWright environmnet
// without document. Maybe should use a init function?
export const commonOptionsDefaults: Partial<CommonOptions> = {
  className: undefined,
  zIndex: 9999
  // container: document.body
}

export const commonSVGOptionsDefaults: Required<SVGOptions> = {
  strokeColor: 'darkorange',
  fillColor: 'orange',
  strokeWidth: 4
}

export function createWrapper(options: CommonOptions) {
  const wrapper = document.createElement('div')

  const opts = {
    ...commonOptionsDefaults,
    ...options
  }

  wrapper.style.zIndex = opts.zIndex!.toString()
  wrapper.style.position = 'absolute'

  if (opts.className) {
    wrapper.classList.add(opts.className)
  }

  return wrapper
}

export function createParentSVG(options: CommonOptions & SVGOptions, wrap: true): HTMLElement
export function createParentSVG(options: CommonOptions & SVGOptions, wrap?: false): SVGSVGElement
export function createParentSVG(options: CommonOptions & SVGOptions, wrap: boolean = false) {
  const opts = {
    ...commonOptionsDefaults,
    ...commonSVGOptionsDefaults,
    ...options
  } as Required<CommonOptions & SVGOptions>

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

  if (wrap) {
    const wrapper = createWrapper(options)
    wrapper.appendChild(svg)
  } else {
    if (opts.className) {
      svg.classList.add(opts.className)
    }
    svg.style.zIndex = opts.zIndex!.toString()
    svg.style.position = 'absolute'
  }

  svg.style.stroke = opts.strokeColor
  svg.style.fill = opts.fillColor
  svg.style.strokeWidth = `${opts.strokeWidth}`
  svg.style.pointerEvents = 'none'
  svg.style.strokeLinejoin = 'round'
  svg.style.strokeLinecap = 'round'

  svg.style.strokeWidth = opts.strokeWidth + 'px'
  return wrap ? svg.parentElement : svg
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

export const availablePointers: Readonly<PointerName[]> = ['rect', 'arrow']

export abstract class BasePointer implements PointItOutPointer {
  abstract pointerElement: PointItOutPointer['pointerElement']

  destroyed = false
  target
  container
  listeners: {
    [PIOEvent in PIOEventName]?: ((payload: PIOPointerEvents[PIOEventName]) => void)[] | undefined
  }

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
    this.pointerElement.remove()
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

export abstract class SVGBasePointer extends BasePointer implements PointItOutSVGPointer {
  strokeWidth: number
  strokeColor: string
  fillColor: string

  constructor(options: CommonOptions & SVGOptions) {
    super(options)
    const opts = { ...commonSVGOptionsDefaults, ...options } as Required<SVGOptions>
    this.strokeWidth = opts.strokeWidth
    this.strokeColor = opts.strokeColor
    this.fillColor = opts.fillColor
  }
}
