<script setup>
	import { ref } from 'vue';

	/* eslint-disable no-unused-vars */
	import { VcParagraph } from 'vue-cosk';

	// Flux components
	import FluxImage from './components/FluxImage.vue';
	import FluxVortex from './components/FluxVortex.vue';
	import FluxCube from './components/FluxCube.vue';
	import FluxGrid from './components/FluxGrid.vue';
	import FluxParallax from './components/FluxParallax.vue';
	import FluxWrapper from './components/FluxWrapper.vue';
	import FluxTransition from './components/FluxTransition.vue';

	// Flux transitions
	import Blinds2D from './transitions/Blinds2D.vue';
	import Blinds3D from './transitions/Blinds3D.vue';
	import Blocks1 from './transitions/Blocks1.vue';
	import Blocks2 from './transitions/Blocks2.vue';
	import Book from './transitions/Book.vue';
	import Camera from './transitions/Camera.vue';
	import Concentric from './transitions/Concentric.vue';
	import Cube from './transitions/Cube.vue';
	import Explode from './transitions/Explode.vue';
	import Fade from './transitions/Fade.vue';
	import Fall from './transitions/Fall.vue';
	import Kenburn from './transitions/Kenburn.vue';
	import Round1 from './transitions/Round1.vue';
	import Round2 from './transitions/Round2.vue';
	import Slide from './transitions/Slide.vue';
	import Swipe from './transitions/Swipe.vue';
	import Warp from './transitions/Warp.vue';
	import Waterfall from './transitions/Waterfall.vue';
	import Wave from './transitions/Wave.vue';
	import Zip from './transitions/Zip.vue';

	// Resources
	import Img from './models/resources/Img.js';

	// Images
	const image01 = new Img('images/01.jpg');
	const image02 = new Img('images/02.jpg');
	const image03 = new Img('images/03.jpg');
	const image04 = new Img('images/04.jpg');
	const image05 = new Img('images/05.jpg');
	const image06 = new Img('images/06.jpg');

	const size = {
		width: 640,
		height: 360,
	};

	const cubeRscs = {
		front: image01,
		right: image02,
		left: image03,
		back: image04,
		top: image05,
		bottom: image06,
	};

	const $fluxTransition = ref(null);

	setTimeout(() => {
		//console.log($fluxTransition.value.start);
		$fluxTransition.value.start();
	}, 2000);
</script>

<template>
	<main class="container mx-auto mb-4">
		<VcParagraph v-for="i of 2" :key="'a'+ i" mode="fill" style="margin: 24px 0;" />

		<div class="relative mx-auto" style="width: 640px; height: 360px;">
			<FluxTransition
				ref="$fluxTransition" 
				:size="{ width: 640, height: 360 }"
				:transition="Zip"
				:from="image03"
				:to="image05"
			/>

			<!-- <FluxVortex :rsc="image01" :size="size" :circles="5" /> -->
		</div>

		<!-- <FluxWrapper><FluxImage :rsc="image01" :size="size" /></FluxWrapper> -->
		<!-- <FluxImage :rsc="image01" :size="size" /> -->
		<!-- <div style="perspective: 1600px; perspective-origin: center center;">
			<FluxCube :rscs="cubeRscs" :size="size" style="transform: rotateX(0deg) rotateY(0deg); transformOrigin: 50% 50% -90px;" :depth="180" />
		</div> -->
		<!-- <FluxGrid :rscs="cubeRscs" :size="size" :rows="3" :cols="5" /> -->
		<!-- <FluxParallax :rsc="image01" style="height: 200px;" /> -->

		<VcParagraph v-for="i of 2" :key="'b'+ i" mode="fill" style="margin: 24px 0;" />
	</main>
</template>
