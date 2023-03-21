<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import useComponentMixin, { baseProps } from '@/mixins/component';

	const $el = ref(null);

	const props = defineProps(baseProps);

	const styles = reactive({
		base: {
			overflow: 'hidden',
		},

		color: computed(() => {
			if (!props.color) return {};

			return {
				backgroundColor: props.color,
			};
		}),

		image: computed(() => {
			const { rsc } = props;

			if (!rsc || !rsc.isLoaded() || !$el.value) {
				return {};
			}

			const bgStyle = rsc.getAdaptedProps();

			if (props.offset !== null) {
				['top', 'left'].forEach(
					(side) => (bgStyle[side] -= props.offset[side] || 0)
				);
			}

			return {
				backgroundImage: `url(${rsc.src})`,
				backgroundSize: `${bgStyle.width}px ${bgStyle.height}px`,
				backgroundPosition: `${bgStyle.left}px ${bgStyle.top}px`,
				backgroundRepeat: 'no-repeat',
			};
		}),
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
	<div ref="$el" class="flux-image" :style="style" />
</template>
