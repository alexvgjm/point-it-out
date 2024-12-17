import type { Origin, NamedSize } from './types'

export const originToAngle = Object.freeze({
  'top right': 315,
  top: 270,
  'top left': 225,
  left: 180,
  'bottom left': 135,
  bottom: 90,
  'bottom right': 45,
  right: 0
}) as Readonly<{ [key in Origin]: number }>

export const sizeNameToNumber = Object.freeze({
  xs: 0.5,
  sm: 0.7,
  md: 1,
  lg: 1.25,
  xl: 2,
  xxl: 3
}) as Readonly<{ [key in NamedSize]: number }>
