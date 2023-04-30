<script setup lang="ts">
	import { ref, reactive, Ref, CSSProperties } from 'vue';
	import useTransitionMixin, {
		TransitionProps,
	} from '../../mixins/transition';
	import { FluxWrapper } from '../../components';
	import { Conf } from './types';
	import { ComponentProps } from '../../mixins/component';
	import Size from '../../shared/Size';
	import { Directions } from '../../types';

	const props = defineProps<TransitionProps>();

	const $wrapper: Ref<null | typeof FluxWrapper> = ref(null);
	const $left: Ref<null | any> = ref(null);
	const $right: Ref<null | any> = ref(null);

	const conf = reactive<Conf>({
		totalDuration: 1400,
		easing: 'ease-in-out',
	});

	useTransitionMixin(conf, props.options);

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

	let left: any;
	let right: any;

	const setup = {
		[Directions.prev]: () => {
			left = props.to;
			right = props.from;
			wrapperProps.css!.transform = 'translateX(-50%)';
		},

		[Directions.next]: () => {
			left = props.from;
			right = props.to;
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
		if ($wrapper.value === null) {
			return;
		}

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
