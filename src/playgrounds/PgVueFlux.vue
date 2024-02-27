<script setup lang="ts">
	import { ref, Ref, shallowReactive } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import { Img } from '../resources';
	import {
		Fade,
		Kenburn,
		Swipe,
		Slide,
		Waterfall,
		Zip,
		Blinds2D,
		Blocks1,
		Blocks2,
		Concentric,
		Warp,
		Camera,
		Cube,
		Book,
		Fall,
		Wave,
		Blinds3D,
		Round1,
		Round2,
		Explode,
	} from '../transitions';
	import * as Complements from '../complements';
	import { VueFlux } from '../components';
	import PgButton from './components/PgButton.vue';
	import ResizeTypes from '../resources/ResizeTypes';
	import { Directions } from '../controllers';

	const $vueFlux: Ref<null | InstanceType<typeof VueFlux>> = ref(null);

	const options = shallowReactive({
		allowFullscreen: true,
		autoplay: false,
		bindKeys: true,
		infinite: true,
		delay: 5000,
		lazyLoadAfter: 10,
	});

	const images = [];
	for (let i = 1; i <= 20; i++) {
		const fileName = i.toString().padStart(2, '0');
		const image = new Img(
			`/images/${fileName}.jpg`,
			'img ' + i,
			ResizeTypes.fill //i % 2 === 0 ? ResizeTypes.fit : ResizeTypes.fill
		);
		images.push(image);
	}

	const rscs = shallowReactive(images);

	const transitions = {
		Blinds2D,
		Blinds3D,
		Blocks1,
		Blocks2,
		Book,
		Camera,
		Concentric,
		Cube,
		Explode,
		Fade,
		Fall,
		Kenburn,
		Round1,
		Round2,
		Slide,
		Swipe,
		Warp,
		Waterfall,
		Wave,
		Zip,
	};

	const transitionComponents = shallowReactive(Object.values(transitions));

	const transitionNames = Object.keys(transitions);
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<div class="block sm:block md:block lg:flex">
			<div class="lg:w-3/4">
				<VueFlux
					ref="$vueFlux"
					:transitions="transitionComponents"
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

					<template #index="indexProps">
						<Complements.FluxIndex v-bind="indexProps" />
					</template>

					<template #pagination="paginationProps">
						<Complements.FluxPagination v-bind="paginationProps" />
					</template>
				</VueFlux>
			</div>

			<div class="lg:w-1/4 lg:ml-4 lg:mt-0 mt-6">
				<ul
					v-if="$vueFlux && $vueFlux.size.isValid()"
					class="flex flex-wrap"
				>
					<li
						v-for="(name, index) in transitionNames"
						:key="name"
						class="mb-4 lg:w-1/2 lg:mr-0 mr-4"
					>
						<PgButton
							class="w-100"
							@click="$vueFlux.show(Directions.next, index)"
						>
							{{ name }}
						</PgButton>
					</li>
				</ul>
			</div>
		</div>

		<div v-if="$vueFlux" class="mt-6">
			<PgButton class="mr-4" @click="$vueFlux.show()">Next</PgButton>
			<PgButton class="mr-4" @click="$vueFlux.play()">Play</PgButton>
			<PgButton class="mr-4" @click="$vueFlux.stop()">Stop</PgButton>
		</div>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
