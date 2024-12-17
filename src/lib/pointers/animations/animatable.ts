export type CommonAnimations = 'pulse'
export interface Animatable<AnimationNames extends string = CommonAnimations> {
  animate?: false | AnimationNames | AnimatableOptions<AnimationNames>
}

export interface AnimatableOptions<T = CommonAnimations> {
  /** The animation name, one from all defined for the pointer type. */
  name: T

  /**
   * How many times animation should be repeated
   * @default 'infinite'
   */
  repeat?: number | 'infinite'

  /**
   * How much time takes to complete the animation in seconds.
   * Longer the duration, slower the animation.
   * @default 1
   */
  duration?: number

  /**
   * @default 'alternate'
   */
  direction?: 'alternate' | 'normal'
}

export const animationDefaults: Partial<AnimatableOptions<unknown>> = {
  direction: 'alternate',
  duration: 1,
  repeat: 'infinite'
}

export function parseAnimateProps<T>(options: T | AnimatableOptions<T>) {
  if (typeof options == 'object') {
    return {
      ...animationDefaults,
      ...options
    }
  }

  return {
    ...animationDefaults,
    name: options
  }
}

export type AnimationTextGenerator<T> = (opts: AnimatableOptions<T>) => string

export function defaultAnimationTextGenerator<T>(opts: AnimatableOptions<T>) {
  return `${opts.duration}s ease-in-out ${opts.repeat} ${opts.direction} pio__${opts.name}`
}

function getKeyframesStylesheet() {
  let sheet = document.head.querySelector<HTMLStyleElement>('#point-it-out-keyframes')
  if (!sheet) {
    sheet = document.createElement('style')
    sheet.title = 'point-it-out-keyframes'
    sheet.id = 'point-it-out-keyframes'
    document.head.appendChild(sheet)
  }

  return sheet
}

export function injectKeyframesIfNotExists(name: string, keyframesBody: { [key: number]: string }) {
  const sheet = getKeyframesStylesheet()
  if (sheet.innerHTML.includes(`@keyframes pio__${name}`)) {
    return
  }

  let keyframe = `@keyframes pio__${name} { `
  Object.entries(keyframesBody).forEach(([percent, props]) => {
    keyframe += `${percent}% { ${props} } `
  })
  keyframe += ' }'

  sheet.innerHTML += keyframe
}

export const commonAnimationTextGenerator: {
  [key in CommonAnimations]: AnimationTextGenerator<CommonAnimations>
} = {
  pulse: defaultAnimationTextGenerator
}
const commonAnimationKeyFrames: {
  [key in CommonAnimations]: { [key: number]: string }
} = {
  pulse: {
    0: `transform: scale(0.95);`,
    100: `transform: scale(1.1);`
  }
}

export function prepareCommonAnimation(
  pointer: { rootElement: Element } & Animatable,
  opts: AnimatableOptions<CommonAnimations> | CommonAnimations
) {
  const animProps = parseAnimateProps(opts)
  pointer.animate = animProps
  ;(pointer.rootElement as HTMLElement).style.animation =
    commonAnimationTextGenerator[animProps.name](animProps)

  injectKeyframesIfNotExists(animProps.name, commonAnimationKeyFrames[animProps.name])
}
