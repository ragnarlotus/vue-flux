<script setup lang="ts">
	import { ref, reactive, Ref } from 'vue';
	import useComponentMixin, { ComponentProps } from '../../mixins/component';

	const props = defineProps<ComponentProps>();

	const $el: Ref<null | HTMLDivElement> = ref(null);

	const styles: any = reactive({
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
