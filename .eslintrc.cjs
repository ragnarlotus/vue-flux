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
		'plugin:vue/vue3-essential',
		'plugin:vue/vue3-strongly-recommended',
		'plugin:vue/vue3-recommended',
		'eslint:recommended',
		'@vue/typescript/recommended',
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
	},
	globals: {
		defineProps: true,
		defineExpose: true,
		defineEmits: true,
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)',
				'**/tests/unit/**/*.spec.{j,t}s?(x)',
			],
			env: {
				jest: true,
			},
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
