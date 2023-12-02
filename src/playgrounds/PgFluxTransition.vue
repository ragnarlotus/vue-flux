<script setup lang="ts">
	import { nextTick, ref, Ref, shallowRef } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import Img from '../resources/Img';
	import Size from '../shared/Size';
	import { FluxTransition } from '../components';
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
	import PgButton from './components/PgButton.vue';

	const $fluxTransition: Ref<null | InstanceType<typeof FluxTransition>> =
		ref(null);

	const transitions = {
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
	};

	const enabled = ref(true);

	const transition = shallowRef(Fade);
	const rscFrom = new Img(`/images/05.jpg`, 'img 05 fill');
	const rscTo = new Img(`/images/06.jpg`, 'img 06 fit');

	const size = new Size({
		width: 640,
		height: 360,
	});

	async function reset() {
		await nextTick();

		enabled.value = false;

		await nextTick();

		enabled.value = true;
	}
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxTransition
			v-if="enabled"
			ref="$fluxTransition"
			:size="size"
			:transition="transition"
			:from="rscFrom"
			:to="rscTo"
			@end="reset"
		/>

		<label v-if="$fluxTransition" class="mt-6">
			<span>Transition</span>

			<select v-model="transition">
				<option
					v-for="(component, name) in transitions"
					:key="name"
					:value="component"
				>
					{{ name }}
				</option>
			</select>

			<PgButton @click="$fluxTransition.start()">Start</PgButton>
		</label>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
