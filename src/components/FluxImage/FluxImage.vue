<script setup lang="ts">
	import { ref, reactive, computed, CSSProperties } from 'vue';
	import useComponentMixin from '../../mixins/component';
	import { ComponentStyles } from '../../types';
	import { Props } from './types';

	const props = defineProps(Props);

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			overflow: 'hidden',
		},

		color: computed<CSSProperties>(() => {
			const colorStyle = {} as CSSProperties;

			if (props.color !== undefined) {
				colorStyle.backgroundColor = props.color;
			}

			return colorStyle;
		}),

		rsc: computed<CSSProperties>(() => {
			const { rsc, offset } = props;

			if (
				!rsc ||
				!rsc.isLoaded() ||
				!rsc.adaptedPropsAreValid.value ||
				!$el.value
			) {
				return {};
			}

			const imageStyle = rsc.getAdaptedProps(offset);

			return {
				backgroundImage: `url(${rsc.src})`,
				backgroundSize: `${imageStyle.width}px ${imageStyle.height}px`,
				backgroundPosition: `${imageStyle.left}px ${imageStyle.top}px`,
				backgroundRepeat: 'no-repeat',
			};
		}),
	});

	const { style, setCss, transform, show, hide } = useComponentMixin(
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
	<div ref="$el" class="flux-image" :style="style" />
</template>
