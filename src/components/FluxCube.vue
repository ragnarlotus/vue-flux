<script setup>
	import { ref, reactive, computed } from 'vue';
	import FluxImage from '@/components/FluxImage.vue';
	import useComponentMixin, {
		baseProps,
	} from '@/models/mixins/component.js';

	const $el = ref(null);

	const props = defineProps({
		...baseProps,

		rscs: {
			type: Object,
			required: true,
		},

		offsets: {
			type: Object,
			default: () => ({}),
		},

		depth: {
			type: Number,
			default: 0,
		},

		sidesCss: {
			type: Object,
			default: () => ({}),
		},
	});

	const styles = reactive({
		base: {
			transformStyle: 'preserve-3d',
		},
		color: props.color,
		props: props.css,
	});

	const {
		style,
		setCss,
		transform,
		show,
		hide,
	} = useComponentMixin($el, props, styles);

	const rotate = {
		x: {
			top: '90',
			bottom: '-90',
		},

		y: {
			back: '180',
			backr: '180',
			backl: '-180',
			left: '-90',
			right: '90',
		},
	};

	const translate = {
		x: {
			left: '-50',
			right: '50',
		},

		y: {
			top: '-50',
			bottom: '50',
		},
	};

	const sideNames = [ 'front', 'back', 'top', 'bottom', 'left', 'right' ];

	const isSideDefined = side => props.rscs[side] || props.color[side] || (typeof props.color === 'string' && props.color);

	const definedSides = computed(() => sideNames.filter(side => isSideDefined(side)));

	const translateZ = computed(() => {
		const {
			size: { width, height },
			viewSize: {
				width: viewWidth,
				height: viewHeight,
			},
			depth,
		} = props;

		const halfDepth = depth / 2;

		return {
			top: halfDepth,
			bottom: viewHeight? viewHeight - halfDepth : height - halfDepth,
			left: halfDepth,
			right: viewWidth? viewWidth - halfDepth : width - halfDepth,
			back: depth,
		};
	});

	function getTransform(side) {
		const rx = rotate.x[side] || 0;
		const ry = rotate.y[side] || 0;
		const tx = translate.x[side] || 0;
		const ty = translate.y[side] || 0;
		const tz = translateZ.value[side] || 0;

		return `rotateX(${rx}deg) rotateY(${ry}deg) translate3d(${tx}%, ${ty}%, ${tz}px)`;
	}

	const sides = computed(() => {
		const sides = {};

		for (let sideName of definedSides.value) {
			const side = {
				ref: sideName,
				rsc: props.rscs[sideName],
				color: props.color[sideName] || props.color,
				offset: props.offsets[sideName] || props.offset,
				size: { ...props.size },
				viewSize: { ...props.viewSize },
				style: {
					...props.sidesCss[sideName],
					position: 'absolute',
					transform: getTransform(sideName),
					backfaceVisibility: 'hidden',
				},
			};

			if (['left', 'right'].includes(sideName)) {
				side.viewSize.width = props.depth;
				side.size.width = props.depth;
			}

			if (['top', 'bottom'].includes(sideName)) {
				side.viewSize.height = props.depth;
				side.size.height = props.depth;
			}

			sides[sideName] = side;
		}

		return sides;
	});

	let $sides = [];

	const getSide = side => $sides[side];

	const turn = side => transform({ transform: getTransform(side) });

	const turnTop = () => turn('top');

	const turnBack = () => turn('back');

	const turnBottom = () => turn('bottom');

	const turnLeft = () => turn('left');

	const turnRight = () => turn('right');

	defineExpose({
		setCss,
		transform,
		show,
		hide,
		getSide,
		turn,
		turnTop,
		turnBack,
		turnBottom,
		turnLeft,
		turnRight
	});
</script>

<template>
	<div ref="$el" :style="style">
		<FluxImage v-for="side in sides" :key="side.ref" v-bind="side" />
	</div>
</template>
