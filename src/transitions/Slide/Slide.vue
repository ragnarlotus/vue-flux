<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxWrapper } from '../../components';
	import { TransitionSlideProps, TransitionSlideConf } from './types';
	import { ComponentProps } from '../../components';
	import { Size } from '../../shared';
	import { Directions } from '../../controllers/Player';
	import { Resource } from '../../resources';

	const props = defineProps<TransitionSlideProps>();

	const $wrapper: Ref<null | InstanceType<typeof FluxWrapper>> = ref(null);
	const $left: Ref<null | FluxComponent> = ref(null);
	const $right: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionSlideConf = reactive({
		totalDuration: 1400,
		easing: 'ease-in-out',
	});

	useTransition(conf, props.options);

	const transition = `transform ${conf.totalDuration}ms ${conf.easing}`;

	const wrapperProps: ComponentProps = {
		size: new Size({
			width: props.size.width.value! * 2,
			height: props.size.height.value!,
		}),
		css: {
			display: 'flex',
			flexWrap: 'nowrap',
		} as CSSProperties,
	};

	let left: Resource;
	let right: Resource;

	const setup = {
		[Directions.prev]: () => {
			left = props.to!;
			right = props.from;
			wrapperProps.css!.transform = 'translateX(-50%)';
		},

		[Directions.next]: () => {
			left = props.from;
			right = props.to!;
		},
	};

	setup[conf.direction!]();

	const play = {
		[Directions.prev]: () => {
			$wrapper.value!.transform({
				transition: transition,
				transform: 'translateX(0)',
			});
		},

		[Directions.next]: () => {
			$wrapper.value!.transform({
				transition: transition,
				transform: 'translateX(-50%)',
			});
		},
	};

	const onPlay = () => {
		play[conf.direction!]();
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxWrapper ref="$wrapper" v-bind="wrapperProps">
		<component
			:is="left.transition.component"
			ref="$left"
			:rsc="left"
			:size="size"
		/>
		<component
			:is="right.transition.component"
			ref="$right"
			:rsc="right"
			:size="size"
		/>
	</FluxWrapper>
</template>
