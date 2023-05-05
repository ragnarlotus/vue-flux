<script setup lang="ts">
	import { ref, Ref, reactive, CSSProperties } from 'vue';
	import { diag } from '../../shared/Maths';
	import useTransition, { TransitionProps } from '../transition';
	import { FluxWrapper } from '../../components';
	import { Conf } from './types';
	import Size from '../../shared/Size';

	const props = defineProps<TransitionProps>();

	const $wrapper: Ref<null | typeof FluxWrapper> = ref(null);
	const $from: Ref<null | any> = ref(null);

	const conf: Conf = reactive({
		circles: 2,
		totalDuration: 900,
		easing: 'cubic-bezier(0.385, 0, 0.795, 0.560)',
		backgroundColor: '#111',
	});

	useTransition(conf, props.options);

	const fromCss: CSSProperties = {
		alignSelf: 'center',
		flex: 'none',
	};

	const diagSize = diag(props.size);

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
		if ([$wrapper.value, $from.value].includes(null)) {
			return;
		}

		$wrapper.value!.transform({
			transition: `all ${conf.totalDuration! / 2 - 50}ms ${conf.easing} 0ms`,
			borderWidth: diagSize / 2 + 'px',
		});

		setTimeout(() => {
			$from.value.hide();

			$wrapper.value!.transform({
				transition: `all ${conf.totalDuration! / 2 - 50}ms ${
					conf.easing
				} 0ms`,
				borderWidth: 0,
			});
		}, conf.totalDuration! / 2 + 50);
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
