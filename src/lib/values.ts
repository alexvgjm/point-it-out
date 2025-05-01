import { isPercent } from './pointers/utils'
import type { NamedOrigin, NamedScale, Origin, OriginX, OriginY, Percent } from './types'

export const originToAngle = Object.freeze({
  'right top': 315,
  top: 270,
  'left top': 225,
  left: 180,
  'left bottom': 135,
  bottom: 90,
  'right bottom': 45,
  right: 0
}) as Readonly<{ [key in NamedOrigin]: number }>

export const sizeNameToNumber = Object.freeze({
  xs: 0.5,
  sm: 0.7,
  md: 1,
  lg: 1.25,
  xl: 2,
  xxl: 3
}) as Readonly<{ [key in NamedScale]: number }>

export const namedOriginToComponents = Object.freeze<{
  [key in NamedOrigin]: Origin
}>({
  top: 'center top',
  'right top': 'right top',
  right: 'right center',
  'right bottom': 'right bottom',
  bottom: 'center bottom',
  'left bottom': 'left bottom',
  left: 'left center',
  'left top': 'left top'
})

export const namedXToStringPercent = Object.freeze<{ [key in OriginX]: Percent }>({
  center: '50%',
  left: '0%',
  right: '100%'
})
export const namedYToStringPercent = Object.freeze<{ [key in OriginY]: Percent }>({
  center: '50%',
  top: '0%',
  bottom: '100%'
})

/**
 *
 * @param percent 0-100 or '0%'-'100%'
 * @returns value from -1 to 1   where -1 = 0%,  0 = 50% and 1 = 100%
 */
export function convertFromPercentToUnitSpace(percent: Percent | number) {
  let p: number

  if (typeof percent == 'string') {
    p = +percent.substring(0, percent.length - 1)
  } else {
    p = percent
  }

  return (p / 100) * 2 - 1
}

export function percentNumber(percent: Percent) {
  return +percent.substring(0, percent.length - 1)
}

export function getAsPercentsNumbers(coords: Origin) {
  const { x, y } = getAsPercents(coords)
  return {
    x: percentNumber(x),
    y: percentNumber(y)
  }
}

export function getAsPercents(coords: Origin): { x: Percent; y: Percent } {
  let [x, y] = coords.split(' ') as [OriginX | Percent, OriginY | Percent]

  if (!isPercent(x)) {
    x = namedXToStringPercent[x]
  }
  if (!isPercent(y)) {
    y = namedYToStringPercent[y]
  }

  return { x, y }
}

export function getUnitSpaceCoords(coords: Origin) {
  const { x, y } = getAsPercents(coords)

  return {
    x: convertFromPercentToUnitSpace(x),
    y: convertFromPercentToUnitSpace(y)
  }
}
