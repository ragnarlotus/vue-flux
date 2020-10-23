<template>
	<div id="app">
		<div>hola</div>
		<flux-button>
			<line x1="32" y1="22" x2="32" y2="78" />
			<line x1="68" y1="22" x2="68" y2="78" />
		</flux-button>
	</div>
</template>

<script>

import { ref, reactive, computed } from 'vue';
import FluxButton from './components/FluxButton.vue';

// const transitions = [
// 	'fade', 'kenburn',
// 	'swipe', 'slide',
// 	'waterfall', 'zip', 'blinds2d',
// 	'blocks1', 'blocks2',
// 	'concentric', 'warp', 'camera',
// 	'cube', 'book', 'fall',
// 	'wave', 'blinds3d',
// 	'round1', 'round2', 'explode',
// ];

export default {
	name: 'App',

	components: {
		FluxButton,
	},

	setup() {
		const selectedTransition = ref('wave');

		const vfOptions = reactive({
			infinite: true,
			autohideTime: 0,
			autoplay: false,
			enableGestures: true,
			delay: 4000,
			aspectRatio: '4:3',
			bindKeys: true,
			allowFullscreen: true,
			lazyLoadAfter: 5,
		});

		let vfImages, vfCaptions;

		function loadImages() {
			// https://unsplash.com/t/nature

			let srcs = [];
			for (let i = 1; i <= 32; i++) {
				srcs.push(`images/${i.toString().padStart(2, '0')}.jpg`);

				// if (i % 3 === 0)
				//  srcs.push(`${i.toString()}`);
				// else
				//  srcs.push(`slides/${i.toString().padStart(2, '0')}.jpg`);
			}

			vfImages = reactive([]);
			vfCaptions = reactive([]);

			let index, src;

			for (let i = 0; i < 32; i++) {
				index = Math.floor(Math.random() * srcs.length);

				src = srcs.splice(index, 1)[0];
				//src = srcs[i];

				vfImages.push(src);
				vfCaptions.push(src);
			}
		}

		loadImages();

		const vfTransitions = computed(() => [selectedTransition]);

		return {
			selectedTransition,
			vfOptions,
			vfImages,
			vfCaptions,
			vfTransitions,
		};
	},
};
</script>

<style lang="scss">
	body {
		color: white;
		background-color: black;
	}
</style>
