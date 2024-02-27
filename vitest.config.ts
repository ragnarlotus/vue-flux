import { defineConfig, configDefaults } from 'vitest/config';
import vue from '@vitejs/plugin-vue';

const exclude = [
	//	...configDefaults.exclude,
	'**/index.ts',
	'**/types.ts',
	'**/__test__/',
	'**/__mocks__/',
	'src/playgrounds/',
	'src/App.vue',
	'src/lib.ts',
	'src/main.ts',
	'src/module.d.ts',
	'src/vite-env.d.ts',
];

export default defineConfig({
	plugins: [vue()],
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['src/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
		exclude: exclude,
		coverage: {
			provider: 'v8',
			include: ['src/**'],
			exclude: exclude,
		},
	},
});
