export interface Animatable<T> {
  animate?: false | T | AnimatableOptions<T>
}

export interface AnimatableOptions<T> {
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

export function parseAnimateProps<T>(options?: false | T | AnimatableOptions<T>) {
  if (!options) {
    return false
  }

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
