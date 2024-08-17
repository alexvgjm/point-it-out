import { commonSVGOptionsDefaults, createSVG, SVGBasePointer } from './core'
import type { ArrowOptions, PointerOptions, SVGOptions } from '../types'
import { distanceFromTo, getRectsInfo, type RectsInfo } from './utils'
import { sizeNameToNumber, originToAngleMap } from '$lib/values'

/**
 * @param w Arrow width
 * @param l Arrow length
 * @param strw strokeWidth
 * @param dist distance
 * @returns the d string
 */
function createArrowDPathAttribute(w: number, l: number, strw: number, dist: number) {
  // Destroying readability here is justified. The code of D attribute is
  // difficult to compress by gzip and can easily grow.
  // pretier-ignore
  const atr = `M${dist + strw / 2} ${w / 2 + strw / 2} L${dist + l / 2 + strw / 2} ${w + strw / 2} l0 -${w / 3} l${l / 2} 0 l0 -${w / 3} l-${l / 2} 0 l0 -${w / 3} Z`
  console.log(atr)
  return atr
}

const arrowDefaults: Readonly<Required<SVGOptions & ArrowOptions>> = Object.freeze({
  ...commonSVGOptionsDefaults,
  strokeWidth: 0,
  fromAngle: 45,
  distance: 0,
  size: 1,
  responsive: false
})

export class ArrowPointer extends SVGBasePointer {
  path: SVGPathElement

  fromAngle: number
  distance: number
  size: number
  responsive?: false | 'rotate' | 'scale'
  private originalSize = 0
  private originalAngle = 0
  constructor(options: PointerOptions['arrow']) {
    const opts = { ...arrowDefaults, ...options } as Required<PointerOptions['arrow']>
    super(opts)
    const g = createSVG<SVGGElement>('g')
    this.path = createSVG<SVGPathElement>('path')
    g.appendChild(this.path)
    this.pointerElement.appendChild(g)
    this.container.appendChild(this.pointerElement)

    if (typeof opts.fromAngle === 'string') {
      this.fromAngle = originToAngleMap[opts.fromAngle]
    } else {
      this.fromAngle = opts.fromAngle
    }

    this.distance = opts.distance
    if (typeof opts.size === 'string') {
      opts.size = sizeNameToNumber[opts.size]
    }
    this.size = opts.size
    this.path.setAttribute('d', createArrowDPathAttribute(96, 128, this.strokeWidth, this.distance))

    this.responsive = opts.responsive

    this.pointerElement.style.fill = this.fillColor
    this.pointerElement.style.stroke = this.strokeColor
    this.pointerElement.style.strokeWidth = `${this.strokeWidth == 0 ? 'none' : this.strokeWidth}`

    this.pointerElement.style.transformOrigin = 'center left'

    this.originalSize = this.size
    this.originalAngle = this.fromAngle
    this.pointerElement.setAttribute('width', `${128 + this.strokeWidth + this.distance}`)
    this.pointerElement.setAttribute('height', `${96 + this.strokeWidth}`)

    this.update()
  }

  update(): void {
    const { targetRect, targetTop, targetLeft } = getRectsInfo(this.target, this.container)
    this.pointerElement.style.left = targetLeft + targetRect.width / 2 + 'px'
    this.pointerElement.style.top = targetTop + targetRect.height / 2 + 'px'

    if (this.responsive) {
      const rect = getRectsInfo(this.target, this.container)
      this.size = this.originalSize
      this.fromAngle = this.originalAngle
      //0,64350110879328436416840886659322 is the angle in rads at which half the arrow is opened at
      //The distance between them is 80 * size

      //0.125 is the angle in rads at which half the arrow is opened at
      //The distance between them is 128.99612397277679443786581168486 * size
      const initAngle = (this.fromAngle * Math.PI) / 180
      const nearAngle = 0.6435011087932843
      const nearDist = 80 + this.strokeWidth
      const farAngle = 0.125
      const farDistance = 128.99612397277679 + this.strokeWidth
      const { center, vertex } = this.calculateVertexPositions(
        rect,
        initAngle,
        nearAngle,
        nearDist,
        farAngle,
        farDistance
      )

      const { pos: i, v: v } = this.calculateFurtherVertex(
        rect,
        vertex[0],
        vertex[1],
        vertex[2],
        vertex[3]
      )
      const distDict = [nearDist, nearDist, farDistance, farDistance]
      const angleDict = [
        initAngle - nearAngle,
        initAngle + nearAngle,
        initAngle - farAngle,
        initAngle + farAngle
      ]
      if (this.responsive == 'scale') {
        if (v.x > rect.containerRect.width) {
          const toReduce =
            1 -
            (distDict[i] * Math.cos(angleDict[i]) - (rect.containerRect.width - center.x)) /
              (distDict[i] * Math.cos(angleDict[i]))
          this.size *= toReduce
        } else if (v.x < 0) {
          const toReduce =
            1 -
            (distDict[i] * Math.cos(angleDict[i]) + center.x) /
              (distDict[i] * Math.cos(angleDict[i]))
          this.size *= toReduce
        } else if (v.y > rect.containerRect.height) {
          const toReduce =
            1 -
            (distDict[i] * Math.sin(angleDict[i]) - (rect.containerRect.height - center.y)) /
              (distDict[i] * Math.sin(angleDict[i]))
          this.size *= toReduce
        } else if (v.y < 0) {
          const toReduce =
            1 -
            (distDict[i] * Math.sin(angleDict[i]) + center.y) /
              (distDict[i] * Math.sin(angleDict[i]))
          this.size *= toReduce
        }
      } else if (this.responsive == 'rotate') {
        const distance = distanceFromTo(center, v)
        if (v.x > rect.containerRect.width) {
          const ang = (Math.acos((rect.containerRect.width - center.x) / distance) / Math.PI) * 180
          if (this.fromAngle > -180 && this.fromAngle <= 0) {
            this.fromAngle = -ang
          } else {
            this.fromAngle = ang
          }
        } else if (v.x < 0) {
          const ang = (Math.acos((0 - center.x) / distance) / Math.PI) * 180
          if (this.fromAngle > -180 && this.fromAngle <= 0) {
            this.fromAngle = -ang
          } else {
            this.fromAngle = ang
          }
        } else if (v.y < 0) {
          const ang = (Math.asin((0 - center.y) / distance) / Math.PI) * 180
          if (this.fromAngle > 90 || this.fromAngle <= -90) {
            this.fromAngle = -ang + 180
          } else {
            this.fromAngle = ang
          }
        } else if (v.y > rect.containerRect.height) {
          const ang = (Math.asin((0 - center.y) / distance) / Math.PI) * 180
          if (this.fromAngle > 90 || this.fromAngle <= -90) {
            this.fromAngle = ang + 180
          } else {
            this.fromAngle = -ang
          }
        }
      }
    }
    this.pointerElement.style.transform = `translateY(-50%) rotate(${this.fromAngle}deg) scale(${this.size})`
  }
  private calculateFurtherVertex(
    rect: RectsInfo,
    p1: { x: number; y: number },
    p2: { x: number; y: number },
    p3: { x: number; y: number },
    p4: { x: number; y: number }
  ) {
    const center = {
      x: rect.containerRect.x + rect.containerRect.width / 2,
      y: rect.containerRect.y + rect.containerRect.height / 2
    }
    let toReturn = {
      v: p1,
      pos: 0
    }

    let farDis = distanceFromTo(center, p1)
    if (distanceFromTo(center, p2) > farDis) {
      toReturn = {
        v: p2,
        pos: 1
      }
      farDis = distanceFromTo(center, p2)
    }
    if (distanceFromTo(center, p3) > farDis) {
      toReturn = {
        v: p3,
        pos: 2
      }
      farDis = distanceFromTo(center, p3)
    }
    if (distanceFromTo(center, p4) > farDis) {
      toReturn = {
        v: p4,
        pos: 3
      }
      farDis = distanceFromTo(center, p4)
    }
    return toReturn
  }

  private calculateVertexPositions(
    rect: RectsInfo,
    initialAngle: number,
    nearbyVertexAngle: number,
    nearbyVertexDistance: number,
    farVertexAngle: number,
    farVertexDistance: number
  ): { center: { x: number; y: number }; vertex: { x: number; y: number }[] } {
    const centerTarget = {
      x: rect.targetLeft + rect.targetRect.width / 2,
      y: rect.targetTop + rect.targetRect.height / 2
    }
    const angToRad = (this.fromAngle * Math.PI) / 180
    const centerArrow = {
      x: this.distance * Math.cos(angToRad),
      y: this.distance * Math.sin(angToRad)
    }
    const realPos = {
      x: centerTarget.x + centerArrow.x,
      y: centerTarget.y + centerArrow.y
    }

    const p1 = {
      x: realPos.x + nearbyVertexDistance * this.size * Math.cos(initialAngle - nearbyVertexAngle),
      y: realPos.y + nearbyVertexDistance * this.size * Math.sin(initialAngle - nearbyVertexAngle)
    }
    const p2 = {
      x: realPos.x + nearbyVertexDistance * this.size * Math.cos(initialAngle + nearbyVertexAngle),
      y: realPos.y + nearbyVertexDistance * this.size * Math.sin(initialAngle + nearbyVertexAngle)
    }

    const p3 = {
      x: realPos.x + farVertexDistance * this.size * Math.cos(initialAngle - farVertexAngle),
      y: realPos.y + farVertexDistance * this.size * Math.sin(initialAngle - farVertexAngle)
    }
    const p4 = {
      x: realPos.x + farVertexDistance * this.size * Math.cos(initialAngle + farVertexAngle),
      y: realPos.y + farVertexDistance * this.size * Math.sin(initialAngle + farVertexAngle)
    }

    return {
      center: realPos,
      vertex: [p1, p2, p3, p4]
    }
  }
}
