import { fileURLToPath, URL } from 'node:url';
import { resolve } from 'node:path';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import dts from 'vite-plugin-dts';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		tailwindcss(),
		dts({
			tsconfigPath: './tsconfig.build.json',
			bundleTypes: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	build: {
		copyPublicDir: false,
		lib: {
			entry: {
				'vue-flux': resolve(__dirname, 'src/lib.ts'),
				'complements/index': resolve(__dirname, 'src/complements/index.ts'),
				'transitions/index': resolve(__dirname, 'src/transitions/index.ts'),
			},
			name: 'VueFlux',
			formats: ['es', 'cjs'],
			fileName: (format, entryName) =>
				`${entryName}.${format === 'es' ? 'js' : 'cjs'}`,
			cssFileName: 'vue-flux',
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
});
