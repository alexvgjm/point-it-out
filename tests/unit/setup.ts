import { beforeEach } from 'vitest'

beforeEach(() => {
	document.body.innerHTML = ''
	const target = document.createElement('div')
	target.classList.add('existing')
	document.body.appendChild(target)

	const pointerElement = document.createElement('div')
	pointerElement.classList.add('pointer-element')
	document.body.appendChild(pointerElement)
})
