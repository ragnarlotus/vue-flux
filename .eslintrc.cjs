module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		parser: '@typescript-eslint/parser',
	},
	plugins: ['@typescript-eslint'],
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-recommended',
		'plugin:vue/vue3-strongly-recommended',
		'@vue/eslint-config-typescript',
		'prettier',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
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
	globals: {
		defineProps: true,
		defineExpose: true,
		defineEmits: true,
	},
	overrides: [
		{
			files: ['**/*.{test,spec}.?(c|m)[jt]s?(x)'],
			plugins: ['vitest'],
			extends: ['plugin:vitest/all'],
		},
		{
			files: ['*.d.ts'],
			rules: {
				'no-unused-vars': 'off',
				'@typescript-eslint/no-unused-vars': ['off'],
			},
		},
	],
};
