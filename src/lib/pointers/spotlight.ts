import type { CommonOptions, PointItOutPointer } from '../types'
import { BasePointer, DEFAULT_COMMON_OPTIONS } from './core'
import type { Animatable, AnimatableOptions, CommonAnimations } from './animations/animatable'
import { prepareAnimation } from './animations/animatable'

const DEFAULT_SPOTLIGHT_OPTIONS: Readonly<Omit<SpotlightPointerOptions, 'target'>> = Object.freeze({
  ...DEFAULT_COMMON_OPTIONS,
  overlayColor: 'rgba(0, 0, 0, 0.75)',
  padding: 10,
  animate: false
})

export interface SpotlightPointerOptions extends CommonOptions, Animatable {
  overlayColor?: string
  padding?: number
}

export class SpotlightPointer extends BasePointer implements PointItOutPointer, Animatable {
  rootElement: HTMLElement
  overlayColor: string
  padding: number
  animate: false | AnimatableOptions<CommonAnimations> = false

  private updatePositionHandler: (() => void) | null = null

  constructor(options: SpotlightPointerOptions) {
    const opts = { ...DEFAULT_SPOTLIGHT_OPTIONS, ...options } as Required<SpotlightPointerOptions>
    super(opts)

    this.overlayColor = opts.overlayColor
    this.padding = opts.padding

    this.rootElement = document.createElement('div')
    this.rootElement.classList.add('pio__spotlight')
    if (opts.className) {
      this.rootElement.classList.add(opts.className)
    }

    const isBodyContainer = this.container === document.body

    Object.assign(this.rootElement.style, {
      position: isBodyContainer ? 'fixed' : 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100vh',
      background: this.overlayColor,
      zIndex: opts.zIndex!.toString(),
      pointerEvents: 'none',
      transition: opts.animate ? 'clip-path 0.3s ease-in-out, opacity 0.3s ease-in-out' : 'none',
      opacity: '0'
    })

    this.container.appendChild(this.rootElement)

    if (opts.animate) {
      prepareAnimation(this, opts.animate)
    }

    this.updatePositionHandler = () => this.update()
    window.addEventListener('scroll', this.updatePositionHandler, true)
    window.addEventListener('resize', this.updatePositionHandler)

    this.update()

    requestAnimationFrame(() => {
      this.rootElement.style.opacity = '1'
    })
  }

  update(): void {
    if (this.destroyed) return

    const targetRect = this.target.getBoundingClientRect()
    const containerRect = this.container.getBoundingClientRect()

    let top, left

    if (this.container === document.body) {
      // Con position: fixed, usamos coordenadas del viewport directamente
      top = targetRect.top - this.padding
      left = targetRect.left - this.padding
    } else {
      // Con position: absolute, calculamos relativo al container
      top = targetRect.top - containerRect.top + this.container.scrollTop - this.padding
      left = targetRect.left - containerRect.left + this.container.scrollLeft - this.padding
    }

    const width = targetRect.width + this.padding * 2
    const height = targetRect.height + this.padding * 2

    if (this.container !== document.body) {
      const totalHeight = this.container.scrollHeight
      this.rootElement.style.height = `${totalHeight}px`
    }

    this.rootElement.style.clipPath = `polygon(
      0% 0%,
      0% 100%,
      ${left}px 100%,
      ${left}px ${top}px,
      ${left + width}px ${top}px,
      ${left + width}px ${top + height}px,
      ${left}px ${top + height}px,
      ${left}px 100%,
      100% 100%,
      100% 0%
    )`
  }

  destroy(): void {
    if (this.destroyed) return

    this.rootElement.style.opacity = '0'

    if (this.updatePositionHandler) {
      window.removeEventListener('scroll', this.updatePositionHandler, true)
      window.removeEventListener('resize', this.updatePositionHandler)
      this.updatePositionHandler = null
    }

    setTimeout(() => {
      super.destroy()
    }, 300)
  }
}
