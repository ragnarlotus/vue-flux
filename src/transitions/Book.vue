<script setup>
	import { ref, reactive } from 'vue';
	import { ceil } from '@/models/partials/math.js';
	import usePartials, { baseProps } from '@/models/partials/transition.js';
	import FluxCube from '@/components/FluxCube.vue';
	import FluxImage from '@/components/FluxImage.vue';

	const $from = ref(null);
	const $cube = ref(null);
	const props = defineProps(baseProps);

	const conf = reactive({
		totalDuration: 1200,
		easing: 'ease-out',
		viewSize: {
			width: ceil(props.size.width / 2),
			height: props.size.height,
		},
		image: {
			offset: {},
			css: {
				position: 'absolute',
				top: 0,
				left: 0,
			},
		},
		cube: {
			rscs: {
				front: props.from,
				back: props.to,
			},
			offsets: {},
			css: {
				position: 'absolute',
				top: 0,
				left: 0,
			},
		},
	});

	usePartials(props.options, conf);

	const halfWidth = () => ceil(props.size.width / 2);

	const halfWidthPx = () => halfWidth +'px';

	Object.assign(props.maskStyle, {
		perspective: '1600px',
		overflow: 'visible',
	});

	const setup = {
		prev: () => {
			conf.image.offset.left = halfWidth;
			conf.image.css.left = halfWidthPx;

			conf.cube.offsets.back = {
				left: halfWidth,
			};

			conf.cube.css = {
				...conf.cube.css,
				transformOrigin: 'right center',
			};
		},

		next: () => {
			conf.cube.offsets.front = {
				left: halfWidth,
			};

			conf.cube.css = {
				...conf.cube.css,
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
		this.$cube.transform({
			transition: `transform ${props.totalDuration}ms ${props.easing}`,
			transform: `rotateY(${getDeg()}deg)`,
		});
	};

	defineExpose(onPlay, conf.totalDuration);
</script>

<template>
	<div>
		<FluxImage
			ref="$from"
			:rsc="from"
			:size="size"
			:view-size="conf.viewSize"
			:offset="conf.image.offset"
			:css="conf.image.css"
		/>

		<FluxCube
			ref="$cube"
			:rscs="conf.cube.rscs"
			:size="size"
			:view-size="conf.viewSize"
			:offsets="conf.cube.offsets"
			:sides-css="conf.cube.sidesCss"
			:css="conf.cube.css"
		/>
	</div>
</template>
