<script setup>
	import { ref, reactive } from 'vue';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/component.js';

	const $el = ref(null);

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
	} = usePartials($el, props, styles);

	defineExpose(setCss, transform, show, hide);
</script>

<template>
	<div ref="$el" :style="style">
		<slot />
	</div>
</template>
