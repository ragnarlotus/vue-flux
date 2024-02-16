<script setup lang="ts">
	import { ref, Ref, reactive, CSSProperties } from 'vue';
	import { Maths } from '../../shared';
	import useTransition from '../useTransition';
	import { FluxComponent, FluxWrapper } from '../../components';
	import { TransitionCameraProps, TransitionCameraConf } from './types';
	import { Size } from '../../shared';

	const props = defineProps<TransitionCameraProps>();

	const $wrapper: Ref<null | InstanceType<typeof FluxWrapper>> = ref(null);
	const $from: Ref<null | FluxComponent> = ref(null);

	const conf: TransitionCameraConf = reactive({
		totalDuration: 900,
		backgroundColor: '#111',
		easing: 'cubic-bezier(0.385, 0, 0.795, 0.560)',
	});

	useTransition(conf, props.options);

	const fromCss: CSSProperties = {
		alignSelf: 'center',
		flex: 'none',
	};

	const diagSize = Maths.diag(
		props.size.toValue() as { width: number; height: number }
	);

	const wrapperSize: Size = new Size({ width: diagSize, height: diagSize });

	const WrapperCss: CSSProperties = {
		boxSizing: 'border-box',
		position: 'absolute',
		display: 'flex',
		justifyContent: 'center',
		overflow: 'hidden',
		borderRadius: '50%',
		border: '0 solid ' + conf.backgroundColor,
		top: (props.size.height.value! - diagSize) / 2 + 'px',
		left: (props.size.width.value! - diagSize) / 2 + 'px',
	};

	const onPlay = () => {
		$wrapper.value!.transform({
			transition: `all ${conf.totalDuration! / 2 - 50}ms ${conf.easing} 0ms`,
			borderWidth: diagSize / 2 + 'px',
		});

		setTimeout(
			() => {
				$from.value!.hide();

				$wrapper.value!.transform({
					transition: `all ${conf.totalDuration! / 2 - 50}ms ${
						conf.easing
					} 0ms`,
					borderWidth: 0,
				});
			},
			conf.totalDuration! / 2 + 50
		);
	};

	defineExpose({
		onPlay,
		totalDuration: conf.totalDuration,
	});
</script>

<template>
	<FluxWrapper ref="$wrapper" :size="wrapperSize" :css="WrapperCss">
		<component
			:is="from.transition.component"
			ref="$from"
			:size="size"
			:rsc="from"
			:css="fromCss"
		/>
	</FluxWrapper>
</template>
