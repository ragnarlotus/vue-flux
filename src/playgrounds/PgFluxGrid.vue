<script setup lang="ts">
	import { ref, Ref } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import Img from '../resources/Img';
	import Size from '../shared/Size';
	import { FluxGrid } from '../components';
	import { ResizeTypes } from '../resources';

	const $fluxGridImage: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);
	const $fluxGridCube: Ref<null | InstanceType<typeof FluxGrid>> = ref(null);

	const rsc = new Img(`/images/01.jpg`, 'img 01', ResizeTypes.fit);

	const size = new Size({
		width: 640,
		height: 360,
	});

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

	const depth: Ref<number> = ref(160);
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxGrid
			ref="$fluxGridImage"
			:rsc="rsc"
			:size="size"
			:rows="10"
			:cols="5"
			color="#ccc"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxGrid
			ref="$fluxGridCube"
			:rscs="rscs"
			:size="size"
			:rows="10"
			:cols="5"
			:depth="depth"
			:colors="colors"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
