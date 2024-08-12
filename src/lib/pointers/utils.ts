import type { Origin } from '../types'

type RectsInfo = {
  targetRect: DOMRect
  containerRect: DOMRect

  /** targetRect.top - containerRect.top */
  relativeTop: number
  /** targetRect.left - containerRect.left */
  relativeLeft: number

  /** relativeTop + container.scrollTop */
  targetTop: number
  /** relativeLeft + container.scrollLeft */
  targetLeft: number
}

export function getRectsInfo(target: HTMLElement, container: HTMLElement): RectsInfo {
  const targetRect = target.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()
  const relativeTop = targetRect.top - containerRect.top
  const relativeLeft = targetRect.left - containerRect.left
  const targetTop = relativeTop + container.scrollTop
  const targetLeft = relativeLeft + container.scrollLeft

  return {
    targetRect,
    containerRect,
    relativeTop,
    relativeLeft,
    targetTop,
    targetLeft
  }
}

export const originStringToAngleMap = Object.freeze({
  'top-right': 315,
  top: 270,
  'top-left': 225,
  left: 180,
  'bottom-left': 135,
  bottom: 90,
  'bottom-right': 45,
  right: 0
}) as Readonly<{ [key in Origin & string]: number }>

export function originStringToAngle(origin: string & Origin) {
  return originStringToAngleMap[origin]
}
