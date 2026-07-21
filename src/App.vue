<script setup lang="ts">
	import { computed, ref } from 'vue';
	import { VcParagraph } from 'vue-cosk';

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

	const playgrounds = {
		VueFlux: PgVueFlux,
		Transition: PgFluxTransition,
		Image: PgFluxImage,
		Cube: PgFluxCube,
		Grid: PgFluxGrid,
		Parallax: PgFluxParallax,
		'Parallax options': PgFluxParallaxOp,
		Caption: PgFluxCaption,
		Controls: PgFluxControls,
		Index: PgFluxIndex,
		Pagination: PgFluxPagination,
		Preloader: PgFluxPreloader,
	} as const;

	type PlaygroundName = keyof typeof playgrounds;

	const selected = ref<PlaygroundName>('VueFlux');
	const activePlayground = computed(() => playgrounds[selected.value]);
</script>

<template>
	<main class="container mx-auto mb-4">
		<VcParagraph mode="fill" style="margin: 24px 0; padding: 0" />

		<nav class="flex items-center gap-3 py-4 text-white">
			<label for="playground" class="m-0 font-semibold">Sample</label>
			<select id="playground" v-model="selected" class="rounded bg-zinc-900 px-3 py-2">
				<option v-for="(_, name) in playgrounds" :key="name" :value="name">
					{{ name }}
				</option>
			</select>
		</nav>

		<div class="relative mx-auto">
			<component :is="activePlayground" />
		</div>

		<VcParagraph mode="fill" style="margin: 24px 0; padding: 0" />
	</main>
</template>
