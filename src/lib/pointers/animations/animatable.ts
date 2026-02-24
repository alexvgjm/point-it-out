export type CommonAnimations = 'pulse'
export interface Animatable<AnimName extends string = CommonAnimations> {
	animate?: false | AnimName | AnimatableOptions<AnimName>
}

export interface AnimatableOptions<AnimName = CommonAnimations> {
	/** The animation name, one from all defined for the pointer type. */
	name: AnimName

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

const commonAnimationKeyFrames: {
	[key in CommonAnimations]: { [key: number]: string }
} = {
	pulse: {
		0: 'transform: scale(0.95);',
		100: 'transform: scale(1.1);'
	}
}

function isCommonAnimation(name: string): name is keyof typeof commonAnimationKeyFrames {
	return name in commonAnimationKeyFrames
}

export function prepareAnimation<AnimName extends string = CommonAnimations>(
	pointer: { rootElement: Element } & Animatable,
	opts: AnimatableOptions<AnimName> | AnimName
) {
	if (typeof opts == 'string') {
		opts = {
			name: opts
		} as AnimatableOptions<AnimName>
	}

	opts = {
		...animationDefaults,
		...opts
	}
	const elm = pointer.rootElement as HTMLElement
	elm.style.animation = defaultAnimationTextGenerator(opts)

	if (isCommonAnimation(opts.name)) {
		injectKeyframesIfNotExists(opts.name, commonAnimationKeyFrames[opts.name])
	}
}
