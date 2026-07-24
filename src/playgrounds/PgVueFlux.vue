<script setup lang="ts">
	import { computed, reactive, ref, type Ref, shallowReactive, watchEffect } from 'vue';
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
			ResizeTypes.fill, //i % 2 === 0 ? ResizeTypes.fit : ResizeTypes.fill
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

	type TransitionName = keyof typeof transitions;

	const enabledTransitions = reactive(
		Object.fromEntries(Object.keys(transitions).map((name) => [name, true])) as Record<
			TransitionName,
			boolean
		>,
	);

	const transitionEntries = computed(() =>
		(
			Object.entries(transitions) as [TransitionName, (typeof transitions)[TransitionName]][]
		).filter(([name]) => enabledTransitions[name]),
	);

	const transitionComponents = shallowReactive(Object.values(transitions));

	watchEffect(() => {
		transitionComponents.splice(
			0,
			transitionComponents.length,
			...transitionEntries.value.map(([, component]) => component),
		);
	});

	const complements = reactive({
		preloader: true,
		caption: true,
		controls: true,
		index: true,
		pagination: true,
	});

	const currentTransitionName = ref(null);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function updateCurrentTransition(_rsc?: any, transition?: any) {
		if (transition.current !== null) {
			currentTransitionName.value = transition.current.component.__name;
		} else {
			currentTransitionName.value = null;
		}
	}
</script>

<template>
	<div>
		<div class="mb-6 grid items-stretch gap-4 text-white lg:grid-cols-[max-content_1fr]">
			<fieldset class="rounded border border-sky-700 px-4 pb-4">
				<legend class="px-2 font-semibold">Complements</legend>

				<div class="flex flex-wrap gap-x-6 gap-y-2 lg:flex-col lg:flex-nowrap">
					<label
						v-for="(_, name) in complements"
						:key="name"
						class="m-0 flex gap-2 whitespace-nowrap capitalize"
					>
						<input v-model="complements[name]" type="checkbox" />

						{{ name }}
					</label>
				</div>
			</fieldset>

			<fieldset class="min-w-0 rounded border border-sky-700 px-4 pb-4">
				<legend class="px-2 font-semibold">Transitions</legend>

				<div class="grid grid-cols-3 gap-x-6 gap-y-2 lg:grid-cols-6">
					<label
						v-for="(_, name) in transitions"
						:key="name"
						class="m-0 flex gap-2 whitespace-nowrap"
					>
						<input v-model="enabledTransitions[name]" type="checkbox" />

						{{ name }}
					</label>
				</div>
			</fieldset>
		</div>

		<div class="block sm:block md:block lg:flex">
			<div class="overflow-hidden lg:w-3/4">
				<VueFlux
					ref="$vueFlux"
					:transitions="transitionComponents"
					:rscs="rscs"
					:options="options"
					@transitionStart="updateCurrentTransition"
					@transitionEnd="updateCurrentTransition"
				>
					<template #preloader="preloaderProps">
						<Complements.FluxPreloader v-if="complements.preloader" v-bind="preloaderProps" />
					</template>

					<template #caption="captionProps">
						<Complements.FluxCaption v-if="complements.caption" v-bind="captionProps" />
					</template>

					<template #controls="controlsProps">
						<Complements.FluxControls v-if="complements.controls" v-bind="controlsProps" />
					</template>

					<template #index="indexProps">
						<Complements.FluxIndex v-if="complements.index" v-bind="indexProps" />
					</template>

					<template #pagination="paginationProps">
						<Complements.FluxPagination
							v-if="complements.pagination"
							v-bind="paginationProps"
						/>
					</template>
				</VueFlux>
			</div>

			<div class="lg:w-1/4 lg:ml-4 lg:mt-0 mt-6">
				<ul v-if="$vueFlux && $vueFlux.size.isValid()" class="flex flex-wrap">
					<li
						v-for="([name], index) in transitionEntries"
						:key="name"
						class="odd:pr-4 mb-4 lg:w-1/2 lg:mr-0 mr-4"
					>
						<PgButton
							class="w-100"
							:active="currentTransitionName === name"
							@click="$vueFlux.show(Directions.next, index)"
						>
							{{ name }}
						</PgButton>
					</li>
				</ul>
			</div>
		</div>

		<div v-if="$vueFlux" class="mt-6 lg:flex">
			<PgButton class="mr-4 w-1/3" @click="$vueFlux.show()">Next</PgButton>
			<PgButton class="mr-4 w-1/3" @click="$vueFlux.play()">Play</PgButton>
			<PgButton class="w-1/3 mr-0" @click="$vueFlux.stop()">Stop</PgButton>
		</div>
	</div>
</template>
