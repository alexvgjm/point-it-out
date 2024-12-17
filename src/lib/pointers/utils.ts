import type { VirtualTransforms } from '$lib/types'

export type RectsInfo = {
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

export function getRectsInfo(target: Element, container: Element): RectsInfo {
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

export function isRectHorizontallyInsideOther(target: DOMRect, container: DOMRect) {
  return target.left >= container.left && target.right <= container.right
}

export function applyVirtualTransform(transform: VirtualTransforms, target: Element) {
  let transformStr = ''

  if (transform.translate) {
    const { x, y } = transform.translate

    if (x && y) {
      transformStr += `translate(${x}, ${y}) `
    } else if (transform.translate.x) {
      transformStr += `translateX(${x}) `
    } else if (transform.translate.y) {
      transformStr += `translateY(${y}) `
    }
  }

  if (transform.rotate) transformStr += `rotate(${transform.rotate}deg) `

  if (transform.scale) transformStr += `scale(${transform.scale}) `
  ;(target as HTMLElement).style.transform = transformStr
}
