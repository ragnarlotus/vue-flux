<script setup lang="ts">
	import { ref, reactive, computed } from 'vue';
	import { FluxImage } from '../';
	import useComponent, { ComponentProps } from '../component';
	import {
		Side,
		SideProps,
		Sides,
		SidesColors,
		SidesOffsets,
		SidesResources,
		Turn,
		Turns,
	} from './types';
	import Size from '../../shared/Size';
	import { ComponentStyles } from '../../types';

	interface Props extends ComponentProps {
		rscs: SidesResources;
		colors?: SidesColors;
		offsets?: SidesOffsets;
		depth: number;
		sidesCss: any;
		viewSize: Size;
	}

	const props = withDefaults(defineProps<Props>(), {
		depth: 0,
		sidesCss: {},
		viewSize: new Size({ width: 0, height: 0 }),
	});

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			transformStyle: 'preserve-3d',
		},
		inherited: props.css,
	});

	const { style, setCss, transform, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	const rotate = {
		x: {
			front: '0',
			back: '0',
			backr: '0',
			backl: '0',
			left: '0',
			right: '0',
			top: '90',
			bottom: '-90',
		},

		y: {
			front: '0',
			back: '180',
			backr: '180',
			backl: '-180',
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
			backr: '0',
			backl: '0',
			left: '-50',
			right: '50',
			top: '0',
			bottom: '0',
		},

		y: {
			front: '0',
			back: '0',
			backr: '0',
			backl: '0',
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

		const { width: viewWidth, height: viewHeight } =
			props.viewSize !== undefined
				? props.viewSize.toRaw()
				: { width: 0, height: 0 };

		const halfDepth = depth / 2;

		return {
			front: '0',
			back: depth,
			backr: depth,
			backl: depth,
			left: halfDepth,
			right: viewWidth ? viewWidth - halfDepth : width - halfDepth,
			top: halfDepth,
			bottom: viewHeight ? viewHeight - halfDepth : height - halfDepth,
		};
	});

	function getTransform(turn: Turn) {
		const rx = rotate.x[turn];
		const ry = rotate.y[turn];
		const tx = translate.x[turn];
		const ty = translate.y[turn];
		const tz = translateZ.value[turn];

		return `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}%, ${ty}%, ${tz}px)`;
	}

	const sides = computed(() => {
		const sides: any = {};

		definedSides.value.forEach((sideName: Side) => {
			const side: SideProps = {
				ref: sideName,
				rsc: props.rscs[sideName],
				size: props.size,
				viewSize: new Size(props.viewSize!.toRaw()),
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
				side.viewSize!.width.value = props.depth;
				side.size.width.value = props.depth;
			}

			if (['top', 'bottom'].includes(sideName)) {
				side.viewSize!.height.value = props.depth;
				side.size.height.value = props.depth;
			}

			sides[sideName] = side;
		});

		return sides;
	});

	const turn = (turn: any) => transform({ transform: getTransform(turn) });

	const turnTop = () => turn(Turns.top);

	const turnBottom = () => turn(Turns.bottom);

	const turnLeft = () => turn(Turns.left);

	const turnRight = () => turn(Turns.right);

	defineExpose({
		setCss,
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
