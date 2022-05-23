<script setup>
	import { ref, reactive } from 'vue';
	import { diag } from '@/models/libs/math.js';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
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
		diag: diag(props.size),
		image: {
			rsc: props.from,
			css: {
				alignSelf: 'center',
				flex: 'none',
			},
		},
		wrapper: {
			size: {
				width: diag,
				height: diag,
			},
			css: {
				boxSizing: 'border-box',
				position: 'absolute',
				display: 'flex',
				justifyContent: 'center',
				overflow: 'hidden',
				borderRadius: '50%',
			},
		},
	});

	useTransitionMixin(props.options, conf);

	Object.assign(conf.wrapper.css, {
		border: '0 solid '+ conf.backgroundColor,
		top: ((props.size.height - conf.diag) / 2) +'px',
		left: ((props.size.width - conf.diag) / 2) +'px',
	});

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
		:size="conf.wrapper.size"
		:css="conf.wrapper.css"
	>
		<FluxImage
			ref="$image"
			:rsc="conf.image.rsc"
			:size="size"
			:css="conf.image.css"
		/>
	</FluxWrapper>
</template>
