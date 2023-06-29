<script setup lang="ts">
	import { ref, reactive, computed, CSSProperties } from 'vue';
	import useComponent from '../component';
	import { Props } from './types';
	import { Size } from '../../shared';
	import { ComponentStyles } from '../../types';

	const props = withDefaults(defineProps<Props>(), {
		viewSize: () => new Size(),
	});

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			overflow: 'hidden',
		},

		color: computed<CSSProperties>(() => {
			const colorStyle: CSSProperties = {};

			if (props.color !== undefined) {
				colorStyle.backgroundColor = props.color;
			}

			return colorStyle;
		}),

		rsc: computed<CSSProperties>(() => {
			const { rsc, size, offset } = props;

			if (!rsc || !rsc.isLoaded() || !size.isValid() || !$el.value) {
				return {};
			}

			const imageStyle = rsc.getResizeProps(size, offset);

			return {
				backgroundImage: `url(${rsc.src})`,
				backgroundSize: `${imageStyle.width}px ${imageStyle.height}px`,
				backgroundPosition: `${imageStyle.left}px ${imageStyle.top}px`,
				backgroundRepeat: 'no-repeat',
			};
		}),
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
	<div ref="$el" class="flux-image" :style="style" />
</template>
