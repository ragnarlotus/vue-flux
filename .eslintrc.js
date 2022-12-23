module.exports = {
	root: true,
	env: {
		node: true,
	},
	parserOptions: {
		ecmaVersion: 'latest',
	},
	extends: [
		'plugin:vue/essential',
		'plugin:vue/strongly-recommended',
		'plugin:vue/recommended',
		'plugin:jest/recommended',
		'eslint:recommended',
		'prettier',
	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'vue/require-default-prop': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/html-indent': [ 'warn', 'tab', {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
			ignores: [],
		}],
		'vue/max-attributes-per-line': [ 'warn', {
			singleline: {
				max: 4,
			},
			multiline: {
				max: 1,
			},
		}],
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
				'**/tests/unit/**/*.spec.{j,t}s?(x)'
			],
			env: {
				jest: true,
			},
		},
	],
}
