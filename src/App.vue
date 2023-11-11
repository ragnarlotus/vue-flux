<script setup lang="ts">
	import { onMounted, reactive, ref, Ref, shallowReactive } from 'vue';

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
	import { Turns } from './components/FluxCube';
	import { ResourceStatus, ResourceWithOptions } from './resources';
	import { Position } from './shared';

	const images = [];
	for (let i = 1; i < 20; i++) {
		const fileName = i.toString().padStart(2, '0');
		const image = new Img(`/images/${fileName}.jpg`, 'img ' + i);
		images.push(image);
	}

	const $wrapper = ref(null);
	const $fluxImage: Ref<null | InstanceType<typeof FluxComponents.FluxImage>> =
		ref(null);
	const $fluxCube: Ref<null | InstanceType<typeof FluxComponents.FluxCube>> =
		ref(null);
	const $fluxGrid: Ref<null | InstanceType<typeof FluxComponents.FluxGrid>> =
		ref(null);
	const $vueFlux: Ref<null | InstanceType<typeof FluxComponents.VueFlux>> =
		ref(null);

	const transitions = shallowReactive(Object.values(Transitions));
	//const transitions = shallowReactive([Transitions.Book]);
	const rscs = shallowReactive(images);
	const options = reactive({
		allowFullscreen: true,
		autoplay: false,
		bindKeys: true,
		infinite: true,
		delay: 5000,
		lazyLoadAfter: 10,
	});

	const size = new Size({
		width: 640,
		height: 360,
	});

	const viewSize = new Size({
		width: 640,
		height: 360,
	});

	const offset = new Position({
		top: 0,
		left: 0,
	});

	const depth: Ref<number> = ref(160);

	const display = new Display($wrapper);
	display.addResizeListener();

	onMounted(async () => {
		await display.updateSize();

		setTimeout(() => {
			$fluxCube.value?.turn(Turns.top);
		}, 1000);
	});
</script>

<template>
	<main class="container mx-auto mb-4">
		<VcParagraph
			v-for="i of 1"
			:key="'a' + i"
			mode="fill"
			style="margin: 24px 0"
		/>

		<div ref="$wrapper" class="relative mx-auto">
			<!-- <FluxComponents.FluxImage
				ref="$fluxImage"
				:rsc="rscs[0]"
				:size="size"
			/> -->

			<!-- 			<div style="perspective: 1600px">
				<FluxComponents.FluxCube
					ref="$fluxCube"
					:rscs="{
						front: rscs[0],
						left: rscs[1],
						right: rscs[2],
						top: rscs[3],
						bottom: rscs[4],
						back: rscs[5],
					}"
					:depth="depth"
					:size="size"
					style="transition: all 4000ms ease-out 0s"
				/>
			</div> -->

			<!-- 			<FluxComponents.FluxGrid
				v-if="display.size.isValid()"
				ref="$fluxGrid"
				:rsc="rscs[0]"
				:size="display.size"
				:rows="10"
				:cols="5"
			/> -->

			<FluxComponents.VueFlux
				ref="$vueFlux"
				:transitions="transitions"
				:rscs="rscs"
				:options="options"
			>
				<template #preloader="preloaderProps">
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
				</template>
			</FluxComponents.VueFlux>

			<!-- 			<div>
				<FluxComponents.FluxParallax
					type="fixed"
					:rsc="rscs[0].resource"
					style="height: 200px"
				/>
			</div>
 -->

			<p style="margin-top: 32px; color: white">
				<button
					type="button"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
					@click="$vueFlux.show()"
				>
					Next
				</button>
				<button
					type="button"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
					@click="$vueFlux.play()"
				>
					Play
				</button>
				<button
					type="button"
					class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
					@click="$vueFlux.stop()"
				>
					Stop
				</button>

				<label>
					<span>Depth</span>
					<input v-model.number="depth" type="number" />
				</label>

				<label>
					<span>Delay</span>
					<input
						v-model.number="options.delay"
						type="number"
						maxlength="5"
					/>
					ms
				</label>
			</p>
		</div>

		<VcParagraph
			v-for="i of 2"
			:key="'b' + i"
			mode="fill"
			style="margin: 24px 0"
		/>
	</main>
</template>

<style lang="scss">
	input[type='text'],
	input[type='number'] {
		background-color: #222;
	}
</style>
