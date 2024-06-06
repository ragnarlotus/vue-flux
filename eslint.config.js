// @ts-check

import js from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import pluginVitest from 'eslint-plugin-vitest';
import pluginPrettier from 'eslint-plugin-prettier-vue';
import vueParser from 'vue-eslint-parser';
import configPrettier from 'eslint-config-prettier';
import pluginTS from 'typescript-eslint';

export default [
	js.configs.recommended,
	...pluginTS.configs.recommended,
	...pluginVue.configs['flat/recommended'],
	{
		languageOptions: {
			ecmaVersion: 'latest',
			sourceType: 'module',
			parser: vueParser,
			parserOptions: {
				ecmaFeatures: { modules: true },
				sourceType: 'module',
				ecmaVersion: 'latest',
				project: true,
				extraFileExtensions: ['.vue'],
				parser: pluginTS.parser,
			},
			globals: {
				node: true,
			},
		},
		files: ['src/**/*.js', 'src/**/*.ts', 'src/**/*.vue'],
		ignores: ['node_modules/*', 'coverage/*', 'dist/*', 'public/*'],
		plugins: {
			'typescript-eslint': pluginTS.plugin,
		},
	},
	{
		plugins: {
			'prettier-vue': pluginPrettier,
		},
		rules: {
			...pluginPrettier.configs.recommended.rules,
			'vue/require-default-prop': 'off',
			'vue/multi-word-component-names': 'off',
			'vue/html-indent': [
				'warn',
				'tab',
				{
					attribute: 1,
					baseIndent: 1,
					closeBracket: 0,
					alignAttributesVertically: true,
					ignores: [],
				},
			],
			'vue/max-attributes-per-line': [
				'warn',
				{
					singleline: {
						max: 4,
					},
					multiline: {
						max: 1,
					},
				},
			],
		},
	},
	{
		files: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'], // or any other pattern
		plugins: {
			vitest: pluginVitest,
		},
		languageOptions: {
			globals: {
				...pluginVitest.environments.env.globals,
			},
		},
		rules: {
			...pluginVitest.configs.all.rules,
			'vitest/prefer-expect-assertions': [
				'warn',
				{ onlyFunctionsWithExpectInLoop: true },
			],
			'vitest/max-expects': [
				'error',
				{
					max: 10,
				},
			],
			'vitest/no-hooks': ['error', { allow: ['beforeEach', 'afterEach'] }],
		},
	},
	configPrettier,
];
