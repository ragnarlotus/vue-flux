<script setup lang="ts">
	import { ref, Ref } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import Img from '../resources/Img';
	import Size from '../shared/Size';
	import { ResizeTypes } from '../resources';
	import { FluxCube, Turns } from '../components';
	import PgButton from './components/PgButton.vue';

	const $fluxCube: Ref<null | InstanceType<typeof FluxCube>> = ref(null);

	const origins = {
		['auto (undefined)']: undefined,
		['left top']: 'left top',
		['left center']: 'left center',
		['left bottom']: 'left bottom',
		['center top']: 'center top',
		['center center']: 'center center',
		['center bottom']: 'center bottom',
		['right top']: 'right top',
		['right center']: 'right center',
		['right bottom']: 'right bottom',
	};

	const colors = {
		front: '#ccc',
		left: '#ccc',
		right: '#ccc',
		top: '#ccc',
		bottom: '#ccc',
		back: '#ccc',
	};

	const rscs = {
		front: new Img(`/images/01.jpg`, 'img 01'),
		left: new Img(`/images/02.jpg`, 'img 02', ResizeTypes.fit),
		right: new Img(`/images/03.jpg`, 'img 03', ResizeTypes.fit),
		top: new Img(`/images/04.jpg`, 'img 04', ResizeTypes.fit),
		bottom: new Img(`/images/05.jpg`, 'img 05', ResizeTypes.fit),
		back: new Img(`/images/06.jpg`, 'img 06', ResizeTypes.fit),
	};

	const size = new Size({
		width: 640,
		height: 360,
	});

	const depth: Ref<number> = ref(160);
	const origin: Ref<undefined | string> = ref(undefined);
	const turnTo: Ref<Turns> = ref(Turns.right);

	function turn() {
		$fluxCube.value?.turn(turnTo.value);
	}
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<div style="perspective: 1600px" class="my-20">
			<FluxCube
				ref="$fluxCube"
				:colors="colors"
				:rscs="rscs"
				:depth="depth"
				:size="size"
				:origin="origin"
				style="transition: all 2000ms ease-out 0s"
			/>
		</div>

		<label>
			<span>Depth:</span>

			<input v-model.number="depth" type="number" style="width: 60px" />
		</label>

		<label>
			<span>Origin:</span>

			<select v-model="origin">
				<option v-for="(value, key) in origins" :key="key" :value="value">
					{{ key }}
				</option>
			</select>
		</label>

		<label>
			<span>Turn:</span>

			<select v-model="turnTo">
				<option v-for="(value, key) in Turns" :key="key" :value="value">
					{{ key }}
				</option>
			</select>

			<PgButton @click="turn()"> Turn </PgButton>
		</label>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
