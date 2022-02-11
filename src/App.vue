<script setup>
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
	// import blinds2d from './transitions/blinds2d.vue';

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
</script>

<template>
	<FluxTransition :size="{ width: 640, height: 360 }" :transition="blinds2d" :from="image01" :to="image02" />
	<!-- <FluxWrapper><FluxImage :rsc="image01" :size="size" /></FluxWrapper> -->
	<!-- <FluxImage :rsc="image01" :size="size" /> -->
	<!-- <FluxVortex :rsc="image01" :size="size" :circles="5" /> -->
	<!-- <div style="perspective: 1600px; perspective-origin: center center;">
		<FluxCube :rscs="cubeRscs" :size="size" style="transform: rotateX(0deg) rotateY(0deg); transformOrigin: 50% 50% -90px;" :depth="180" />
	</div> -->
	<!-- <FluxGrid :rsc="image01" :size="size" :rows="3" :cols="5" /> -->
	<!-- <VcParagraph v-for="i of 12" :key="'a'+ i" mode="fill" style="margin-top: 24px;" /> -->
	<!-- <FluxParallax :rsc="image01" style="height: 200px;" /> -->
	<!-- <VcParagraph v-for="i of 12" :key="'b'+ i" mode="fill" style="margin-top: 24px;" /> -->
</template>
