<script setup>
	import { ref, reactive, computed } from 'vue';
	import Dom from '@/models/Dom.js';
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

		color: computed(() => {
			if (!props.color || !props.color.value)
				return {};

			return {
				backgroundColor: props.color.value,
			};
		}),

		image: computed(() => {
			const rsc = props.rsc;

			if (!rsc || rsc.status.value !== 'loaded' || !$el.value)
				return {};

			const backgroundStyle = rsc.getCoverProps(props.size || Dom.sizeFrom($el.value));

			if (props.offset) {
				for (const side of ['top', 'left'])
					backgroundStyle[side] -= props.offset[side] || 0;
			}

			return {
				backgroundImage: `url(${rsc.src})`,
				backgroundSize: `${backgroundStyle.width}px ${backgroundStyle.height}px`,
				backgroundPosition: `${backgroundStyle.left}px ${backgroundStyle.top}px`,
				backgroundRepeat: 'no-repeat',
			};
		}),
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
	<div ref="$el" class="flux-image" :style="style" />
</template>
