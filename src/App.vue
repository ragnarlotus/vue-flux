<script setup lang="ts">
	import { ref, Ref } from 'vue';

	// Playgrounds
	/* eslint-disable no-unused-vars */
	import PgFluxImage from './playgrounds/PgFluxImage.vue';
	import PgFluxCube from './playgrounds/PgFluxCube.vue';
	import PgFluxGrid from './playgrounds/PgFluxGrid.vue';
	import PgFluxTransition from './playgrounds/PgFluxTransition.vue';
	import PgVueFlux from './playgrounds/PgVueFlux.vue';
	import PgFluxParallax from './playgrounds/PgFluxParallax.vue';
	import PgFluxParallaxOp from './playgrounds/PgFluxParallaxOp.vue';

	// Flux components
	import * as FluxComponents from './components';

	const $wrapper: Ref<null | HTMLDivElement> = ref(null);
</script>

<template>
	<main class="container mx-auto mb-4">
		<div ref="$wrapper" class="relative mx-auto">
			<!-- <PgFluxImage /> -->
			<!-- <PgFluxCube /> -->
			<!-- <PgFluxGrid /> -->
			<!-- <PgFluxTransition /> -->
			<!-- <PgVueFlux /> -->
			<!-- <PgFluxParallax /> -->
			<PgFluxParallaxOp />
		</div>
	</main>
</template>

<style lang="scss">
	@keyframes spinner {
		to {
			transform: rotate(360deg);
		}
	}

	.custom-spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		text-align: center;
		line-height: 50px;
		margin-top: -25px;
		margin-left: -25px;
		width: 50px;
		height: 50px;
		z-index: 14;

		&:before {
			content: '';
			box-sizing: border-box;
			position: absolute;
			top: 50%;
			left: 50%;
			width: 50px;
			height: 50px;
			margin-top: -25px;
			margin-left: -25px;
			border-radius: 50%;
			border: 1px solid #ccc;
			border-top-color: #07d;
			animation: spinner 0.6s linear infinite;
		}
	}
</style>
