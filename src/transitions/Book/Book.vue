<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxCube } from '../../components';
	import { TransitionBookProps, TransitionBookConf } from './types';
	import { Position, Size } from '../../shared';
	import { SidesOffsets } from '../../components/FluxCube/types';
	import { Directions } from '../../controllers/Player';

	const props = defineProps<TransitionBookProps>();

	const $from: Ref<null | FluxComponent> = ref(null);
	const $cube: Ref<null | InstanceType<typeof FluxCube>> = ref(null);

	const conf: TransitionBookConf = reactive({
		totalDuration: 1200,
		easing: 'ease-out',
	});

	useTransition(conf, props.options);

	const viewSize: Size = new Size({
		width: Math.ceil(props.size.width.value! / 2),
		height: props.size.height.value,
	});

	const wrapperStyle: CSSProperties = {
		perspective: '1600px',
		width: '100%',
		height: '100%',
	};

	const fromOffset = new Position({
		top: 0,
		left: 0,
	});

	const fromCss = {
		position: 'absolute',
		top: 0,
		left: 0,
	} as CSSProperties;

	const cube = {
		rscs: {
			front: props.from,
			back: props.to,
		},
		offsets: {
			front: new Position({
				top: 0,
				left: 0,
			}),
			back: new Position({
				top: 0,
				left: 0,
			}),
		} as SidesOffsets,
		origin: '',
		css: {
			position: 'absolute',
			top: 0,
			left: 0,
		} as CSSProperties,
	};

	const halfWidth: number = Math.ceil(props.size.width.value! / 2);
	const halfWidthPx: string = halfWidth.toString() + 'px';

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const setup = {
		prev: () => {
			fromOffset.left.value = halfWidth;
			fromCss.left = halfWidthPx;

			cube.offsets.back!.left.value = halfWidth;
			cube.origin = 'right center';
			cube.css = {
				...cube.css,
			};
		},

		next: () => {
			cube.offsets.front!.left.value = halfWidth;
			cube.origin = 'left center';
			cube.css = {
				...cube.css,
				left: halfWidthPx,
			};
		},
	};

	setup[conf.direction!]();

	const deg = {
		[Directions.prev]: '180',
		[Directions.next]: '-180',
	}[conf.direction!];

	const onPlay = () => {
		$cube.value!.transform({
			transition: `transform ${conf.totalDuration}ms ${conf.easing}`,
			transform: `rotateY(${deg}deg)`,
		});
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<div :style="wrapperStyle">
		<component
			:is="from.transition.component"
			ref="$from"
			:rsc="from"
			:size="size"
			:view-size="viewSize"
			:offset="fromOffset"
			:css="fromCss"
		/>

		<FluxCube
			ref="$cube"
			:rscs="cube.rscs"
			:size="size"
			:view-size="viewSize"
			:offsets="cube.offsets"
			:origin="cube.origin"
			:css="cube.css"
		/>
	</div>
</template>
