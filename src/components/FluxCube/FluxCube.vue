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
		Turns,
	} from './types';
	import { Size } from '../../shared';
	import { ComponentStyles } from '../../types';

	interface Props extends ComponentProps {
		colors?: SidesColors;
		rscs?: SidesResources;
		offsets?: SidesOffsets;
		depth?: number;
	}

	const props = withDefaults(defineProps<Props>(), {
		rscs: () => ({}),
		colors: () => ({}),
		offsets: () => ({}),
		depth: 0,
		viewSize: () => new Size(),
	});

	const $el = ref(null);

	const styles: ComponentStyles = reactive({
		base: {
			transformStyle: 'preserve-3d',
		},
	});

	const { style, setCss, transform, show, hide } = useComponent(
		$el,
		props,
		styles
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
		if (props.rscs !== undefined && props.rscs[side] !== undefined) {
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

	function getTransform(turn: Side | Turns) {
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
				color: props.colors[sideName] || props.color,
				rsc: props.rscs[sideName] || props.rsc,
				size: new Size(props.size.toRaw()),
				viewSize: new Size(props.viewSize!.toRaw()),
				offset: props.offsets[sideName] || props.offset,
				css: {
					position: 'absolute',
					transform: getTransform(sideName),
					backfaceVisibility: 'hidden',
				},
			};

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

	const turn = (turn: Turns) => transform({ transform: getTransform(turn) });

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
