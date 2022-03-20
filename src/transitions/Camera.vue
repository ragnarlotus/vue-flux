<script setup>
	import { ref, reactive } from 'vue';
	import { diag } from '@/models/partials/math.js';
	import {
		baseProps,
		default as usePartials
	} from '@/models/partials/transition.js';
	import FluxWrapper from '@/components/FluxWrapper.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $wrapper = ref(null);
	const $image = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		circles: 2,
		totalDuration: 900,
		easing: 'cubic-bezier(0.385, 0, 0.795, 0.560)',
		backgroundColor: '#111',
		image: props.from,
		diag: diag(props.size),
		wrapperSize: {
			width: diag,
			height: diag,
		},
		wrapperCss: {
			boxSizing: 'border-box',
			position: 'absolute',
			display: 'flex',
			justifyContent: 'center',
			overflow: 'hidden',
			borderRadius: '50%',
		},
		imageCss: {
			alignSelf: 'center',
			flex: 'none',
		},
	});

	usePartials(props.options, conf);

	conf.wrapperCss = {
		...conf.wrapperCss,
		border: '0 solid '+ conf.backgroundColor,
		top: ((props.size.height - conf.diag) / 2) +'px',
		left: ((props.size.width - conf.diag) / 2) +'px',
	};

	const onPlay = () => {
		$wrapper.transform({
			transition: `all ${conf.totalDuration / 2 - 50}ms ${conf.easing} 0ms`,
			borderWidth: (conf.diag / 2) +'px',
		});

		setTimeout(() => {
			$image.hide();

			$wrapper.transform({
				transition: `all ${conf.totalDuration / 2 - 50}ms ${conf.easing} 0ms`,
				borderWidth: 0,
			});
		}, conf.totalDuration / 2 + 50);
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<FluxWrapper
		ref="$wrapper"
		:size="conf.wrapperSize"
		:css="conf.wrapperCss"
	>
		<FluxImage
			ref="$image"
			:rsc="rsc"
			:size="size"
			:css="conf.imageCss"
		/>
	</FluxWrapper>
</template>
