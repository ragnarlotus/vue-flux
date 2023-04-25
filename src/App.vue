<script setup lang="ts">
	import { ref, shallowReactive } from 'vue';

	/* eslint-disable no-unused-vars */
	import { VcParagraph } from 'vue-cosk';

	// Flux components
	import * as FluxComponents from './components';

	// Flux transitions
	import * as Transitions from './transitions';

	// Flux complements
	import * as Complements from './complements';

	// Resources
	import Img from './resources/Img.js';

	const images = [];
	for (let i = 1; i < 20; i++) {
		const fileName = i.toString().padStart(2, '0');
		const image = new Img(`/images/${fileName}.jpg`, 'img ' + i);
		images.push(image);
	}

	const $vueFlux = ref(null);

	const transitions = shallowReactive(Object.values(Transitions));
	//const transitions = shallowReactive([Transitions.Camera]);
	const rscs = shallowReactive(images);
	const options = shallowReactive({
		allowFullscreen: true,
		autoplay: false,
		bindKeys: true,
		infinite: false,
		lazyLoadAfter: 10,
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
			>
				<!-- <template #preloader="preloaderProps">
					<Complements.FluxPreloader v-bind="preloaderProps" />
				</template>

				<template #caption="captionProps">
					<Complements.FluxCaption v-bind="captionProps" />
				</template>

				<template #controls="controlsProps">
					<Complements.FluxControls v-bind="controlsProps" />
				</template>

				<template #pagination="paginationProps">
					<Complements.FluxPagination v-bind="paginationProps" />
				</template>

				<template #index="indexProps">
					<Complements.FluxIndex v-bind="indexProps" />
				</template> -->
			</FluxComponents.VueFlux>
		</div>

		<VcParagraph
			v-for="i of 2"
			:key="'b' + i"
			mode="fill"
			style="margin: 24px 0"
		/>
	</main>
</template>
