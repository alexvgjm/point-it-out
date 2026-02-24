import js from '@eslint/js'
import ts from 'typescript-eslint'
import svelte from 'eslint-plugin-svelte'
import stylistic from '@stylistic/eslint-plugin'
import globals from 'globals'

/** @type {import('eslint').Linter.Config[]} */
export default [
	js.configs.recommended,
	...ts.configs.recommended,
	...svelte.configs['flat/recommended'],
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},
	{
		files: ['**/*.svelte', '**/*.svelte.ts'],
		languageOptions: {
			parserOptions: {
				parser: ts.parser
			}
		},
		rules: {
			'no-undef': 'off',
			'svelte/no-at-html-tags': 'off'
		}
	},
	{
		files: ['**/*.ts'],
		plugins: {
			'@stylistic': stylistic
		},
		rules: {
			'no-undef': 'off',
			indent: 'off',
			'@stylistic/indent': ['error', 'tab']
		}
	},
	{
		files: ['**/*.js', '**/*.ts', '**/*.svelte', '**/*.svelte.ts'],
		rules: {
			quotes: ['error', 'single'],
			semi: ['error', 'never'],
			curly: ['error', 'all']
		}
	},
	{
		files: ['**/*.js', '**/*.svelte', '**/*.svelte.ts'],
		rules: {
			indent: ['error', 'tab']
		}
	},
	{
		ignores: ['build/', '.svelte-kit/', 'dist/', 'dist-npm/', 'dist-docs/']
	}
]
