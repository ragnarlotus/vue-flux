<script setup lang="ts">
	import { onMounted, ref, Ref, shallowReactive } from 'vue';

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
	import { Display } from './controllers';
	import Size from './shared/Size';
	import { ResourceStatus } from './resources/types';

	const images = [];
	for (let i = 1; i < 20; i++) {
		const fileName = i.toString().padStart(2, '0');
		const image = new Img(`/images/${fileName}.jpg`, 'img ' + i);
		images.push(image);
	}

	const $wrapper = ref(null);
	const $vueFlux: Ref<null | InstanceType<typeof FluxComponents.VueFlux>> =
		ref(null);
	const $fluxGrid: Ref<null | InstanceType<typeof FluxComponents.FluxGrid>> =
		ref(null);
	const $fluxImage: Ref<null | InstanceType<typeof FluxComponents.FluxImage>> =
		ref(null);

	//const transitions = shallowReactive(Object.values(Transitions));
	const transitions = shallowReactive([Transitions.Waterfall]);
	const rscs = shallowReactive(images);
	const options = shallowReactive({
		allowFullscreen: true,
		autoplay: false,
		bindKeys: true,
		infinite: false,
		lazyLoadAfter: 10,
	});

	const display = new Display($wrapper);
	display.addResizeListener();
	rscs[0].load();

	onMounted(async () => {
		await display.updateSize();
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

		<div ref="$wrapper" class="relative mx-auto">
			<FluxComponents.FluxImage
				ref="$fluxImage"
				:rsc="rscs[0]"
				:size="display.size"
			/>

			<!-- <FluxComponents.FluxGrid
				v-if="size !== null"
				ref="$fluxGrid"
				:rsc="rscs[0]"
				:size="size"
				:rows="10"
				:cols="5"
			/> -->

			<!-- <FluxComponents.VueFlux
				ref="$vueFlux"
				:transitions="transitions"
				:rscs="rscs"
				:options="options"
			> -->

			<!-- <template #preloader="preloaderProps">
					<Complements.FluxPreloader v-bind="preloaderProps" />
				</template>

				<template #caption="captionProps">
					<Complements.FluxCaption v-bind="captionProps" />
				</template> -->

			<!-- <template #controls="controlsProps">
				<Complements.FluxControls v-bind="controlsProps" />
			</template>
 -->
			<!-- <template #pagination="paginationProps">
					<Complements.FluxPagination v-bind="paginationProps" />
				</template> -->

			<!-- <template #index="indexProps">
					<Complements.FluxIndex v-bind="indexProps" />
				</template> -->
			<!-- </FluxComponents.VueFlux> -->
		</div>

		<VcParagraph
			v-for="i of 2"
			:key="'b' + i"
			mode="fill"
			style="margin: 24px 0"
		/>
	</main>
</template>
