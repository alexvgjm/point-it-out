import type { ArrowAnimation, ArrowPointer } from '../arrow'
import type { AnimatableOptions, AnimationTextGenerator } from './animatable'
import {
  defaultAnimationTextGenerator,
  injectKeyframesIfNotExists,
  parseAnimateProps
} from './animatable'

const arrowAnimationTextGenerator: {
  [key in ArrowAnimation]: AnimationTextGenerator<ArrowAnimation>
} = {
  pulse: defaultAnimationTextGenerator
}

const arrowAnimationKeyFrames: {
  [key in ArrowAnimation]: { [key: number]: string }
} = {
  pulse: {
    0: `transform: scale(0.95);`,
    100: `transform: scale(1.1);`
  }
}

export function prepareArrowAnimation(
  pointer: ArrowPointer,
  opts: ArrowAnimation | AnimatableOptions<ArrowAnimation>
) {
  const animProps = parseAnimateProps(opts)
  pointer.animate = animProps

  pointer.pointerElement.style.animation = arrowAnimationTextGenerator[animProps.name](animProps)

  injectKeyframesIfNotExists(animProps.name, arrowAnimationKeyFrames[animProps.name])
}
