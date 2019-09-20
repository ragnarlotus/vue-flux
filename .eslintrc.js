module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/essential',
		'plugin:vue/strongly-recommended',
		'plugin:vue/recommended',
		'plugin:jest/recommended',
		'eslint:recommended',

	],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		'vue/require-default-prop': 'off',
		'vue/html-indent': [ 'warn', 'tab', {
			attribute: 1,
			baseIndent: 1,
			closeBracket: 0,
			alignAttributesVertically: true,
			ignores: []
		}],
		'vue/max-attributes-per-line': [ 'warn', {
			singleline: 4,
			multiline: {
				max: 1,
				allowFirstLine: false
			},
		}],
	},
	parserOptions: {
		parser: 'babel-eslint'
	},
	overrides: [
		{
			files: [
				'**/__tests__/*.{j,t}s?(x)'
			],
			env: {
				jest: true
			}
		}
	]
}
