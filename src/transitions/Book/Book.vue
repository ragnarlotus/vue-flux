<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import { ceil } from '../../shared/Maths';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxCube } from '../../components';
	import { Conf } from './types';
	import { Position, Size } from '../../shared';
	import { SidesOffsets } from '../../components/FluxCube/types';

	export interface Props extends TransitionProps {}

	const props = defineProps<Props>();

	const $from: Ref<null | any> = ref(null);
	const $cube: Ref<null | typeof FluxCube> = ref(null);

	const conf: Conf = reactive({
		totalDuration: 1200,
		easing: 'ease-out',
	});

	useTransition(conf, props.options);

	const viewSize: Size = new Size({
		width: ceil(props.size.width.value! / 2),
		height: props.size.height.value,
	});

	const wrapperStyle: CSSProperties = {
		perspective: '1600px',
		width: '100%',
		height: '100%',
	};

	const from = {
		offset: new Position({
			top: 0,
			left: 0,
		}),
		css: {
			position: 'absolute',
			top: 0,
			left: 0,
		} as CSSProperties,
	};

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
		css: {
			position: 'absolute',
			top: 0,
			left: 0,
		} as CSSProperties,
	};

	const halfWidth: number = ceil(props.size.width.value! / 2);
	const halfWidthPx: string = halfWidth.toString() + 'px';

	// eslint-disable-next-line vue/no-mutating-props
	props.maskStyle.overflow = 'visible';

	const setup = {
		prev: () => {
			from.offset.left.value = halfWidth;
			from.css.left = halfWidthPx;

			cube.offsets.back!.left.value = halfWidth;

			cube.css = {
				...cube.css,
				transformOrigin: 'right center',
			};
		},

		next: () => {
			cube.offsets.front!.left.value = halfWidth;

			cube.css = {
				...cube.css,
				left: halfWidthPx,
				transformOrigin: 'left center',
			};
		},
	};

	setup[conf.direction!]();

	const deg = {
		prev: '180',
		next: '-180',
	}[conf.direction!];

	const onPlay = () => {
		if ([$from.value, $cube.value].includes(null)) {
			return;
		}

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
			:offset="from.offset"
			:css="from.css"
		/>

		<FluxCube
			ref="$cube"
			:rscs="cube.rscs"
			:size="size"
			:view-size="viewSize"
			:offsets="cube.offsets"
			:css="cube.css"
		/>
	</div>
</template>
