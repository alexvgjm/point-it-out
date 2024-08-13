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
