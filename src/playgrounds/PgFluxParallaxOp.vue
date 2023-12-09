<script lang="ts">
	import { defineComponent, markRaw } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import Img from '../resources/Img';
	import { FluxParallax } from '../components';

	export default defineComponent({
		components: {
			VcParagraph,
			FluxParallax,
		},
		data() {
			return {
				rsc: markRaw(new Img(`/images/01.jpg`, 'img 01')),
			};
		},
	});
</script>

<template>
	<div>
		<VcParagraph
			v-for="i of 6"
			:key="'a' + i"
			mode="fill"
			style="margin: 24px 0"
		/>

		<FluxParallax type="fixed" :rsc="rsc" style="height: 200px" />

		<VcParagraph
			v-for="i of 6"
			:key="'b' + i"
			mode="fill"
			style="margin: 24px 0"
		/>
	</div>
</template>
