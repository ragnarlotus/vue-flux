<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import FluxImage from '../FluxImage/FluxImage.vue';
	import useComponentMixin, { BaseProps } from '../../mixins/component';
	import {
		Side,
		SideProps,
		Sides,
		SidesColors,
		SidesOffsets,
		SidesResources,
	} from './types';
	import Size from '../../shared/Size';

	const $el = ref(null);

	interface Props extends BaseProps {
		rscs: SidesResources;
		colors?: SidesColors;
		offsets?: SidesOffsets;
		depth: number;
		sidesCss: any;
	}

	const props = withDefaults(defineProps<Props>(), {
		depth: 0,
		sidesCss: {},
		viewSize: new Size({ width: 0, height: 0 }),
	});

	const componentStyles = reactive({
		base: {
			transformStyle: 'preserve-3d',
		},
		color: props.color,
		inherited: props.css,
	});

	const { style, setStyle, transform, show, hide } = useComponentMixin(
		$el,
		props,
		componentStyles
	);

	const rotate = {
		x: {
			front: '0',
			back: '0',
			left: '0',
			right: '0',
			top: '90',
			bottom: '-90',
		},

		y: {
			front: '0',
			back: '180',
			left: '-90',
			right: '90',
			top: '0',
			bottom: '0',
		},
	};

	const translate = {
		x: {
			front: '0',
			back: '0',
			left: '-50',
			right: '50',
			top: '0',
			bottom: '0',
		},

		y: {
			front: '0',
			back: '0',
			left: '0',
			right: '0',
			top: '-50',
			bottom: '50',
		},
	};

	const definedSides = computed<Sides[]>(() =>
		Object.values(Sides).filter((side) => isSideDefined(side))
	);

	function isSideDefined(side: Side) {
		if (props.rscs[side] !== undefined) {
			return true;
		}

		if (props.colors !== undefined && props.colors[side] !== undefined) {
			return true;
		}

		return false;
	}

	const translateZ = computed(() => {
		const { depth } = props;

		const { width, height } = props.size.toRaw();

		const { viewWidth, viewHeight } =
			props.viewSize !== undefined
				? props.viewSize.toRaw()
				: { viewWidth: 0, viewHeight: 0 };

		const halfDepth = depth / 2;

		return {
			front: '0',
			back: depth,
			left: halfDepth,
			right: viewWidth ? viewWidth - halfDepth : width - halfDepth,
			top: halfDepth,
			bottom: viewHeight ? viewHeight - halfDepth : height - halfDepth,
		};
	});

	function getTransform(side: Side) {
		const rx = rotate.x[side];
		const ry = rotate.y[side];
		const tx = translate.x[side];
		const ty = translate.y[side];
		const tz = translateZ.value[side];

		return `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}%, ${ty}%, ${tz}px)`;
	}

	const sides = computed(() => {
		const sides = {};

		definedSides.value.forEach((sideName: Side) => {
			const side: SideProps = {
				ref: sideName,
				rsc: props.rscs[sideName],
				size: props.size,
				viewSize: props.viewSize,
				css: {
					...props.sidesCss[sideName],
					position: 'absolute',
					transform: getTransform(sideName),
					backfaceVisibility: 'hidden',
				},
			};

			if (
				props.colors !== undefined &&
				props.colors[sideName] !== undefined
			) {
				side.color = props.colors[sideName];
			}

			if (
				props.offsets !== undefined &&
				props.offsets[sideName] !== undefined
			) {
				side.offset = props.offsets[sideName];
			}

			if (['left', 'right'].includes(sideName)) {
				side.viewSize.width.value = props.depth;
				side.size.width.value = props.depth;
			}

			if (['top', 'bottom'].includes(sideName)) {
				side.viewSize.height.value = props.depth;
				side.size.height.value = props.depth;
			}

			sides[sideName] = side;
		});

		return sides;
	});

	const turn = (side: Side) => transform({ transform: getTransform(side) });

	const turnTop = () => turn('top');

	const turnBottom = () => turn('bottom');

	const turnLeft = () => turn('left');

	const turnRight = () => turn('right');

	defineExpose({
		setStyle,
		transform,
		show,
		hide,
		turn,
		turnTop,
		turnBottom,
		turnLeft,
		turnRight,
	});
</script>

<template>
	<div ref="$el" :style="style">
		<FluxImage v-for="(side, index) in sides" :key="index" v-bind="side" />
	</div>
</template>
