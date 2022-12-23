<script setup>
	import { ref, shallowReactive, onMounted } from 'vue';

	/* eslint-disable no-unused-vars */
	import { VcParagraph } from 'vue-cosk';

	// Flux components
	import * as FluxComponents from './components';

	// Flux transitions
	import * as Transitions from './transitions';

	// Resources
	import Img from './models/resources/Img.js';

	// Images
	const image01 = new Img('/images/01.jpg');
	const image02 = new Img('/images/02.jpg');
	const image03 = new Img('/images/03.jpg');
	const image04 = new Img('/images/04.jpg');
	const image05 = new Img('/images/05.jpg');
	const image06 = new Img('/images/06.jpg');

	const size = {
		width: 640,
		height: 360,
	};

	/* 	const cubeRscs = {
		front: image01,
		right: image02,
		left: image03,
		back: image04,
		top: image05,
		bottom: image06,
	}; */

	const $fluxTransition = ref(null);
	const $vueFlux = ref(null);

	const transitions = shallowReactive(Object.values(Transitions));
	const rscs = shallowReactive([image01, image02, image03]);
	const options = shallowReactive({ autoplay: true });

	onMounted(() => {
		// console.log($fluxTransition.value.start);
		// $vueFlux.value.play();
	});
</script>

<template>
	<main class="container mx-auto mb-4">
		<VcParagraph
			v-for="i of 2"
			:key="'a' + i"
			mode="fill"
			style="margin: 24px 0"
		/>

		<div class="relative mx-auto">
			<FluxComponents.VueFlux
				ref="$vueFlux"
				:transitions="transitions"
				:rscs="rscs"
				:options="options"
			/>

			<!-- 			<FluxComponents.FluxTransition
				ref="$fluxTransition"
				:size="size"
				:transition="Transitions.Explode"
				:from="image03"
				:to="image05"
			/> -->
		</div>

		<!-- <FluxComponents.FluxVortex :rsc="image01" :size="size" :circles="5" /> -->
		<!-- <FluxComponents.FluxWrapper><FluxComponents.FluxImage :rsc="image01" :size="size" /></FluxComponents.FluxWrapper> -->
		<!-- <FluxComponents.FluxImage :rsc="image01" :size="size" /> -->
		<!-- <div style="perspective: 1600px; perspective-origin: center center;">
			<FluxComponents.FluxCube :rscs="cubeRscs" :size="size" style="transform: rotateX(0deg) rotateY(0deg); transformOrigin: 50% 50% -90px;" :depth="180" />
		</div> -->
		<!-- <FluxComponents.FluxGrid :rscs="cubeRscs" :size="size" :rows="3" :cols="5" /> -->
		<!-- <FluxComponents.FluxParallax :rsc="image01" type="visible" style="height: 200px;" /> -->

		<VcParagraph
			v-for="i of 2"
			:key="'b' + i"
			mode="fill"
			style="margin: 24px 0"
		/>
	</main>
</template>
