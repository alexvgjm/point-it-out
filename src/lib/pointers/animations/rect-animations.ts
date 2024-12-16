import type { RectAnimation, RectPointer } from '../rect'
import type { AnimatableOptions, AnimationTextGenerator } from './animatable'
import {
  defaultAnimationTextGenerator,
  injectKeyframesIfNotExists,
  parseAnimateProps
} from './animatable'

const rectAnimationTextGenerator: {
  [key in RectAnimation]: AnimationTextGenerator<RectAnimation>
} = {
  pulse: defaultAnimationTextGenerator
}

const rectAnimationKeyFrames: {
  [key in RectAnimation]: { [key: number]: string }
} = {
  pulse: {
    0: `transform: scale(0.95);`,
    100: `transform: scale(1.1);`
  }
}

export function prepareRectAnimation(
  pointer: RectPointer,
  opts: RectAnimation | AnimatableOptions<RectAnimation>
) {
  const animProps = parseAnimateProps(opts)
  pointer.animate = animProps

  pointer.pointerElement.style.animation = rectAnimationTextGenerator[animProps.name](animProps)

  injectKeyframesIfNotExists(animProps.name, rectAnimationKeyFrames[animProps.name])
}
