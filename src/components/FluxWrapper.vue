<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/component.js';

	const wrapper = ref(null);

	const props = defineProps(baseProps);

	const styles = reactive({
		base: {
			overflow: 'hidden',
		},
	});

	const {
		style,
		setCss,
		transform,
		show,
		hide,
	} = usePartials(wrapper, props, styles);

	defineExpose(setCss, transform, show, hide);
</script>

<template>
	<div ref="wrapper" :style="style">
		<slot />
	</div>
</template>
