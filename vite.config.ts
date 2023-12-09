import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		copyPublicDir: false,
		lib: {
			entry: resolve(__dirname, 'src/lib.ts'),
			name: 'VueFlux',
			fileName: 'vue-flux',
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	plugins: [vue(), dts({ rollupTypes: true })],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'src'),
		},
	},
});
