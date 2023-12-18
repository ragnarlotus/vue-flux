<script setup lang="ts">
	import { ref, shallowReactive, onMounted } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import { VueFlux } from '../components';
	import { FluxControls } from '../complements';
	import { Img } from '../resources';
	import { Book, Zip } from '../transitions';

	const $vueFlux = ref();

	const options = shallowReactive({
		autoplay: true,
	});

	const rscs = shallowReactive([
		new Img(`/images/01.jpg`, 'img 01'),
		new Img(`/images/02.jpg`, 'img 02'),
		new Img(`/images/03.jpg`, 'img 03'),
		new Img(`/images/04.jpg`, 'img 04'),
		new Img(`/images/05.jpg`, 'img 05'),
		new Img(`/images/06.jpg`, 'img 06'),
	]);

	const transitions = shallowReactive([Book, Zip]);

	const mounted = ref(false);

	onMounted(() => {
		mounted.value = true;
	});
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux :options="options" :rscs="rscs" :transitions="transitions">
			<template #controls="controlsProps">
				<FluxControls v-bind="controlsProps" />
			</template>
		</VueFlux>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux
			ref="$vueFlux"
			:options="options"
			:rscs="rscs"
			:transitions="transitions"
		/>

		<FluxControls v-if="mounted" :player="$vueFlux.getPlayer()" />

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
