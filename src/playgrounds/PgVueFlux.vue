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
		allowToSkipTransition: true,
		aspectRatio: '16:9',
		autohideTime: 2500,
		autoplay: false,
		bindKeys: true,
		enableGestures: false,
		infinite: true,
		delay: 5000,
		lazyLoad: true,
		lazyLoadAfter: 10,
	});

	const booleanOptions = {
		allowFullscreen: 'Fullscreen',
		allowToSkipTransition: 'Skip transition',
		autoplay: 'Autoplay',
		bindKeys: 'Bind keys',
		enableGestures: 'Gestures',
		infinite: 'Infinite',
		lazyLoad: 'Lazy load',
	} as const;

	const numberOptions = {
		autohideTime: 'Autohide time',
		delay: 'Delay',
		lazyLoadAfter: 'Lazy load after',
	} as const;

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
		<div class="mb-6 flex flex-col gap-4 text-white lg:flex-row">
			<fieldset class="w-full min-w-0 rounded border border-sky-700 px-4 pb-4 lg:flex-[2_1_0%]">
				<legend class="px-2 font-semibold">Options</legend>

				<div class="-mx-2 flex flex-wrap gap-y-2">
					<label
						v-for="(label, name) in booleanOptions"
						:key="name"
						class="m-0 flex w-full gap-2 px-2 whitespace-nowrap xs:w-1/2 sm:w-1/3 lg:w-1/2"
					>
						<input v-model="options[name]" type="checkbox" />

						{{ label }}
					</label>

					<label
						class="m-0 flex w-full items-center gap-2 px-2 whitespace-nowrap xs:w-1/2 sm:w-1/3 lg:w-1/2"
					>
						<span>Aspect ratio</span>

						<input
							v-model="options.aspectRatio"
							class="w-16 text-black"
							type="text"
							style="width: 50px"
						/>
					</label>

					<label
						v-for="(label, name) in numberOptions"
						:key="name"
						class="m-0 flex w-full items-center gap-2 px-2 whitespace-nowrap xs:w-1/2 sm:w-1/3 lg:w-1/2"
					>
						<span>{{ label }}</span>

						<input
							v-model.number="options[name]"
							class="w-20 text-black"
							min="0"
							type="number"
							style="width: 50px"
						/>
					</label>
				</div>
			</fieldset>

			<fieldset class="w-full min-w-0 rounded border border-sky-700 px-4 pb-4 lg:flex-[1_1_0%]">
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

			<fieldset class="w-full min-w-0 rounded border border-sky-700 px-4 pb-4 lg:flex-[3_1_0%]">
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

			<div class="mt-6 lg:mt-0 lg:ml-4 lg:w-1/4">
				<ul v-if="$vueFlux && $vueFlux.size.isValid()" class="-mx-2 flex flex-wrap">
					<li
						v-for="([name], index) in transitionEntries"
						:key="name"
						class="mb-4 w-1/2 px-2 xs:w-1/3 lg:w-1/2"
					>
						<PgButton
							class="w-full"
							:active="currentTransitionName === name"
							@click="$vueFlux.show(Directions.next, index)"
						>
							{{ name }}
						</PgButton>
					</li>
				</ul>
			</div>
		</div>

		<div v-if="$vueFlux" class="mt-6 flex">
			<PgButton class="mr-4 p-1 w-1/3" @click="$vueFlux.show()">Next</PgButton>
			<PgButton class="mr-4 p-1 w-1/3" @click="$vueFlux.play()">Play</PgButton>
			<PgButton class="p-1 w-1/3 mr-0" @click="$vueFlux.stop()">Stop</PgButton>
		</div>
	</div>
</template>
