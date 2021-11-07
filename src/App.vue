<script setup>
	import FluxImage from './components/FluxImage.vue';
	import FluxVortex from './components/FluxVortex.vue';
	import Img from './models/resources/Img.js';
	const image01 = new Img('images/01.jpg');
</script>

<template>
	<!-- <FluxImage :rsc="image01" :size="{width: 640, height: 480}" /> -->
	<FluxVortex :rsc="image01" :size="{width: 640, height: 480}" :circles="5" />
</template>
