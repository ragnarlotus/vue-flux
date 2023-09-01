<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useComponent, { ComponentProps } from '../component';
	import { ComponentStyles } from '../../types';

	const props = defineProps<ComponentProps>();

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
	<div ref="$el" :style="style">
		<slot />
	</div>
</template>
