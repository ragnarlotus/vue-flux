<script setup lang="ts">
	import { ref, shallowReactive, onMounted, Ref } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import { VueFlux } from '../components';
	import { FluxIndex } from '../complements';
	import { Img } from '../resources';
	import { Book, Zip } from '../transitions';
	import { Player } from '../controllers';

	const $vueFlux = ref();

	const options = shallowReactive({
		autoplay: false,
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

	const player: Ref<null | Player> = ref(null);

	onMounted(() => {
		player.value = $vueFlux.value.getPlayer();
	});
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux :options="options" :rscs="rscs" :transitions="transitions">
			<template #index="indexProps">
				<FluxIndex v-bind="indexProps" />
			</template>
		</VueFlux>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<VueFlux
			ref="$vueFlux"
			:options="options"
			:rscs="rscs"
			:transitions="transitions"
		/>

		<FluxIndex v-if="player" :display-size="$vueFlux.size" :player="player" />

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
