<script setup>
	import { VcParagraph } from 'vue-cosk';
	import FluxImage from './components/FluxImage.vue';
	import FluxVortex from './components/FluxVortex.vue';
	import FluxParallax from './components/FluxParallax.vue';

	import Img from './models/resources/Img.js';
	const image01 = new Img('images/01.jpg', 'fill');
</script>

<template>
	<FluxImage :rsc="image01" :size="{width: 640, height: 480}" />
	<!-- <FluxVortex :rsc="image01" :size="{width: 640, height: 480}" :circles="5" /> -->
	<VcParagraph v-for="i of 12" :key="'a'+ i" mode="fill" style="margin-top: 24px;" />
	<FluxParallax :rsc="image01" style="height: 200px;" />
	<VcParagraph v-for="i of 12" :key="'b'+ i" mode="fill" style="margin-top: 24px;" />
</template>
