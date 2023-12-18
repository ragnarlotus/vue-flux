<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useComponent from '../useComponent';
	import { ComponentStyles } from '../types';
	import { FluxWrapperProps } from './types';

	const props = defineProps<FluxWrapperProps>();

	const $el: Ref<null | HTMLDivElement> = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			overflow: 'hidden',
		},
	});

	const { style, setCss, transform, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	defineExpose({
		setCss,
		transform,
		show,
		hide,
	});
</script>

<template>
	<div ref="$el" class="flux-wrapper" :style="style">
		<slot />
	</div>
</template>
