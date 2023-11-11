<script setup lang="ts">
	import { ref, reactive, computed, CSSProperties } from 'vue';
	import useComponent from '../useComponent';
	import { FluxImageProps } from './types';
	import { Size } from '../../shared';
	import { ComponentStyles } from '../types';
	import { ResourceStatus } from '../../resources';

	const props = withDefaults(defineProps<FluxImageProps>(), {
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

			if (!rsc) {
				return {};
			}

			if (rsc.status.value === ResourceStatus.notLoaded) {
				rsc.load();
				return {};
			}

			if (!rsc.isLoaded() || !size.isValid() || !$el.value) {
				return {};
			}

			const { width, height, top, left } = rsc.getResizeProps(size, offset);

			return {
				backgroundImage: `url(${rsc.src})`,
				backgroundSize: `${width}px ${height}px`,
				backgroundPosition: `${left}px ${top}px`,
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
