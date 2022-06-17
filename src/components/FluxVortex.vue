<script setup>
	import { ref, reactive, computed } from 'vue';
	import { round, ceil, diag } from '@/models/libs/math.js';
	import FluxImage from '@/components/FluxImage.vue';
	import useComponentMixin, {
		baseProps,
	} from '@/models/mixins/component.js';

	const $el = ref(null);

	const props = defineProps({
		...baseProps,

		circles: {
			type: Number,
			default: 1,
		},

		tileCss: Object,
	});

	const styles = reactive({
		base: {
			position: 'relative',
			overflow: 'hidden',
		},
		color: props.color,
		props: props.css,
	});

	const {
		style,
		setCss,
		show,
		hide,
	} = useComponentMixin($el, props, styles);

	const numCircles = computed(() => {
		return round(props.circles);
	});

	const diagonal = computed(() => {
		return diag(props.size);
	});

	const radius = computed(() => {
		return ceil(diagonal.value / 2 / numCircles.value);
	});

	const topGap = computed(() => {
		return ceil(props.size.height / 2 - radius.value * numCircles.value);
	});

	const leftGap = computed(() => {
		return ceil(props.size.width / 2 - radius.value * numCircles.value);
	});

	const tiles = computed(() => {
		const tiles = [];

		for (let i = 0; i < numCircles.value; i++) {
			const size = (numCircles.value - i) * radius.value * 2;
			const gap = radius.value * i;

			const tile = {
				offset: {
					top: topGap.value + gap,
					left: leftGap.value + gap,
				},
			};

			tile.css = {
				...props.tileCss,
				position: 'absolute',
				left: tile.offset.left +'px',
				top: tile.offset.top + 'px',
				width: size +'px',
				height: size +'px',
				backgroundRepeat: 'repeat',
				borderRadius: '50%',
				zIndex: i,
			};

			tiles.push(tile);
		}

		return tiles;
	});

	let $tiles = [];

	const transform = func => {
		$tiles.forEach((tile, i) => func(tile, i));
	};

	defineExpose({
		setCss,
		transform,
		show,
		hide,
	});
</script>

<template>
	<div ref="$el" :style="style">
		<FluxImage
			v-for="(tile, index) in tiles"
			:ref="el => { if (el) $tiles[index] = el }"
			:key="index"
			:size="size"
			:rsc="rsc"
			:offset="tile.offset"
			:css="tile.css"
		/>
	</div>
</template>
