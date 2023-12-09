<script setup lang="ts">
	import { ref, Ref } from 'vue';
	import { VcParagraph } from 'vue-cosk';
	import Img from '../resources/Img';
	import Size from '../shared/Size';
	import { ResizeTypes } from '../resources';
	import { FluxImage } from '../components';

	const $fluxImage: Ref<null | InstanceType<typeof FluxImage>> = ref(null);

	const rscLandscapeFill = new Img(`/images/01.jpg`, 'img 01 fill');

	const rscLandscapeFit = new Img(
		`/images/01.jpg`,
		'img 01 fit',
		ResizeTypes.fit
	);

	const rscPortraitFill = new Img(`/images/00.jpg`, 'img 00 fill');

	const rscPortraitFit = new Img(
		`/images/00.jpg`,
		'img 00 fit',
		ResizeTypes.fit,
		'#111'
	);

	const sizeLandscape = new Size({
		width: 640,
		height: 360,
	});

	const sizePortrait = new Size({
		width: 211,
		height: 360,
	});
</script>

<template>
	<div>
		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscLandscapeFill"
			:size="sizeLandscape"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscLandscapeFit"
			:size="sizeLandscape"
			color="#ccc"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscLandscapeFill"
			:size="sizePortrait"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscLandscapeFit"
			:size="sizePortrait"
			color="#ccc"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage ref="$fluxImage" :rsc="rscPortraitFill" :size="sizePortrait" />

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscPortraitFit"
			:size="sizePortrait"
			color="#ccc"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscPortraitFill"
			:size="sizeLandscape"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />

		<FluxImage
			ref="$fluxImage"
			:rsc="rscPortraitFit"
			:size="sizeLandscape"
			color="#ccc"
		/>

		<VcParagraph mode="fill" style="margin: 24px 0" />
	</div>
</template>
