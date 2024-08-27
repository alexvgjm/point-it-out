import type { RectAnimation, RectPointer } from '../rect'
import type { AnimatableOptions, AnimationTextGenerator } from './animatable'
import { defaultAnimationTextGenerator, parseAnimateProps } from './animatable'

const rectAnimationTextGenerator: {
  [key in RectAnimation]: AnimationTextGenerator<RectAnimation>
} = {
  pulse: defaultAnimationTextGenerator
}

export function prepareRectAnimation(
  pointer: RectPointer,
  opts: RectAnimation | AnimatableOptions<RectAnimation>
) {
  const animProps = parseAnimateProps(opts)
  pointer.animate = animProps

  pointer.pointerElement.style.animation = rectAnimationTextGenerator[animProps.name](animProps)
}
