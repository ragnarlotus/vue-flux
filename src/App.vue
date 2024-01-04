<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
	import { ref, Ref } from 'vue';

	// Playgrounds
	import PgFluxImage from './playgrounds/PgFluxImage.vue';
	import PgFluxCube from './playgrounds/PgFluxCube.vue';
	import PgFluxGrid from './playgrounds/PgFluxGrid.vue';
	import PgFluxTransition from './playgrounds/PgFluxTransition.vue';
	import PgVueFlux from './playgrounds/PgVueFlux.vue';
	import PgFluxParallax from './playgrounds/PgFluxParallax.vue';
	import PgFluxParallaxOp from './playgrounds/PgFluxParallaxOp.vue';
	import PgFluxCaption from './playgrounds/PgFluxCaption.vue';
	import PgFluxControls from './playgrounds/PgFluxControls.vue';
	import PgFluxIndex from './playgrounds/PgFluxIndex.vue';
	import PgFluxPagination from './playgrounds/PgFluxPagination.vue';
	import PgFluxPreloader from './playgrounds/PgFluxPreloader.vue';

	const $wrapper: Ref<null | HTMLDivElement> = ref(null);
</script>

<template>
	<main class="container mx-auto mb-4">
		<div ref="$wrapper" class="relative mx-auto">
			<!-- <PgFluxImage /> -->
			<!-- <PgFluxCube /> -->
			<!-- <PgFluxGrid /> -->
			<!-- <PgFluxTransition /> -->
			<PgVueFlux />
			<!-- <PgFluxParallax /> -->
			<!-- <PgFluxParallaxOp /> -->
			<!-- <PgFluxCaption /> -->
			<!-- <PgFluxControls /> -->
			<!-- <PgFluxIndex /> -->
			<!-- <PgFluxPagination /> -->
			<!-- <PgFluxPreloader /> -->
		</div>
	</main>
</template>
