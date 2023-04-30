<script setup lang="ts">
	import { ref, reactive } from 'vue';
	import useComponentMixin, { baseProps } from '@/mixins/component.js';

	const props = defineProps(baseProps);

	const $el = ref(null);

	const styles = reactive({
		base: {
			overflow: 'hidden',
		},
	});

	const { style, setCss, transform, show, hide } = useComponentMixin(
		$el,
		props,
		styles
	);

	defineExpose({
		setCss,
		transform,
		show,
		hide,
	});
</script>

<template>
	<div ref="$el" :style="style">
		<slot />
	</div>
</template>
