import type {
  CommonOptions,
  PIOEventName,
  PIOPointerEvents,
  PointerName,
  PointItOutPointer,
  SVGOptions,
  PointItOutSVGPointer,
  VirtualTransforms
} from '../types'

// FIXME: container: document.body
// Default at constructor to avoid PlayWright environmnet
// without document. Maybe should use a init function?
export const commonOptionsDefaults: Partial<CommonOptions> = {
  className: undefined,
  zIndex: 9999
}

export const commonSVGOptionsDefaults: Required<SVGOptions> = {
  strokeColor: 'darkorange',
  fillColor: 'orange',
  strokeWidth: 4
}

function createParentSVG(options: CommonOptions & SVGOptions) {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  const opts = {
    ...commonOptionsDefaults,
    ...commonSVGOptionsDefaults,
    ...options
  } as Required<CommonOptions & SVGOptions>

  svg.style.zIndex = opts.zIndex!.toString()
  svg.style.position = 'absolute'
  svg.style.stroke = opts.strokeColor
  svg.style.fill = opts.fillColor
  svg.style.strokeWidth = `${opts.strokeWidth}`
  svg.style.pointerEvents = 'none'
  svg.style.strokeLinejoin = 'round'
  svg.style.strokeLinecap = 'round'

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

export const availablePointers: Readonly<PointerName[]> = ['rect', 'arrow']

export abstract class BasePointer implements PointItOutPointer {
  destroyed = false
  target
  pointerElement
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
    this.pointerElement = createParentSVG(options)
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

  transform?: VirtualTransforms

  constructor(options: CommonOptions & SVGOptions) {
    super(options)
    const opts = { ...commonSVGOptionsDefaults, ...options } as Required<SVGOptions>
    this.strokeWidth = opts.strokeWidth
    this.strokeColor = opts.strokeColor
    this.fillColor = opts.fillColor
  }

  applyTransform() {
    if (!this.transform) {
      return
    }

    let transformStr = ''

    if (this.transform.translate) {
      const { x, y } = this.transform.translate

      if (x && y) {
        transformStr += `translate(${x}, ${y}) `
      } else if (this.transform.translate.x) {
        transformStr += `translateX(${x}) `
      } else if (this.transform.translate.y) {
        transformStr += `translateY(${y}) `
      }
    }

    if (this.transform.rotate) transformStr += `rotate(${this.transform.rotate}deg) `

    if (this.transform.scale) transformStr += `scale(${this.transform.scale})`

    this.pointerElement.style.transform = transformStr
  }
}
