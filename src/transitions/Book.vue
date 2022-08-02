<script setup>
	import { ref, reactive } from 'vue';
	import { ceil } from '@/models/libs/math.js';
	import useTransitionMixin, { baseProps } from '@/models/mixins/transition.js';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $from = ref(null);
	const $cube = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1200,
		easing: 'ease-out',
	});

	useTransitionMixin(props.options, conf);

	const viewSize = {
		width: ceil(props.size.width / 2),
		height: props.size.height,
	};

	const wrapperStyle = {
		perspective: '1600px',
		width: '100%',
		height: '100%',
	};

	const image = {
		offset: {},
		css: {
			position: 'absolute',
			top: 0,
			left: 0,
		},
	};

	const cube = {
		rscs: {
			front: props.from,
			back: props.to,
		},
		offset: {},
		css: {
			position: 'absolute',
			top: 0,
			left: 0,
		},
	};

	const halfWidth = ceil(props.size.width / 2);
	const halfWidthPx = halfWidth +'px';

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const setup = {
		prev: () => {
			image.offset.left = halfWidth;
			image.css.left = halfWidthPx;

			cube.offset.back = {
				left: halfWidth,
			};

			cube.css = {
				...cube.css,
				transformOrigin: 'right center',
			};
		},

		next: () => {
			cube.offset.front = {
				left: halfWidth,
			};

			cube.css = {
				...cube.css,
				left: halfWidthPx,
				transformOrigin: 'left center',
			};
		},
	};

	setup[conf.direction]();

	const getDeg = () => ({
		prev: '180',
		next: '-180',
	}[conf.direction]);

	const onPlay = () => {
		$cube.value.transform({
			transition: `transform ${conf.totalDuration}ms ${conf.easing}`,
			transform: `rotateY(${getDeg()}deg)`,
		});
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<div :style="wrapperStyle">
		<FluxImage
			ref="$from"
			:rsc="from"
			:size="size"
			:view-size="viewSize"
			:offset="image.offset"
			:css="image.css"
		/>

		<FluxCube
			ref="$cube"
			:rscs="cube.rscs"
			:size="size"
			:view-size="viewSize"
			:offset="cube.offset"
			:sides-css="cube.sidesCss"
			:css="cube.css"
		/>
	</div>
</template>
