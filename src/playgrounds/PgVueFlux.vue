<script setup lang="ts">
	import { reactive, ref, Ref, shallowReactive } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import Img from '../resources/Img';
	import * as Transitions from '../transitions';
	import * as Complements from '../complements';
	import { VueFlux } from '../components';
	import PgButton from './components/PgButton.vue';
	import ResizeTypes from '../resources/ResizeTypes';

	const $vueFlux: Ref<null | InstanceType<typeof VueFlux>> = ref(null);

	const options = reactive({
		allowFullscreen: true,
		autoplay: false,
		bindKeys: true,
		infinite: true,
		delay: 5000,
		lazyLoadAfter: 10,
	});

	const images = [];
	for (let i = 1; i < 20; i++) {
		const fileName = i.toString().padStart(2, '0');
		const image = new Img(
			`/images/${fileName}.jpg`,
			'img ' + i,
			i % 2 === 0 ? ResizeTypes.fit : ResizeTypes.fill
		);
		images.push(image);
	}

	const rscs = shallowReactive(images);

	const transitions = shallowReactive(Object.values(Transitions));
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux
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

			<template #index="indexProps">
				<Complements.FluxIndex v-bind="indexProps" />
			</template>

			<template #pagination="paginationProps">
				<Complements.FluxPagination v-bind="paginationProps" />
			</template>
		</VueFlux>

		<div v-if="$vueFlux" class="mt-6 -ml-3">
			<PgButton @click="$vueFlux.show()">Next</PgButton>
			<PgButton @click="$vueFlux.play()">Play</PgButton>
			<PgButton @click="$vueFlux.stop()">Stop</PgButton>
		</div>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>