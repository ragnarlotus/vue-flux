<script setup lang="ts">
	import { ref, reactive, computed, CSSProperties, Ref } from 'vue';
	import { ceil } from '../../shared/Maths';
	import useComponent, { ComponentProps } from '../component';
	import { FluxCube } from '../';
	import { ComponentStyles } from '../../types';
	import { SidesColors, SidesResources } from '../FluxCube/types';
	import GridCreator, { getRowNumber, getColNumber } from './GridCreator';

	interface Props extends ComponentProps {
		colors?: SidesColors;
		rscs?: SidesResources;
		rows?: number;
		cols?: number;
		depth?: number;
		tileCss?: CSSProperties;
	}

	const props = withDefaults(defineProps<Props>(), {
		rows: 1,
		cols: 1,
		depth: 0,
	});

	const $el = ref(null);

	const componentStyles: ComponentStyles = reactive({
		base: {
			position: 'relative',
		},
	});

	const { style, setCss, show, hide } = useComponent(
		$el,
		props,
		componentStyles
	);

	const component = computed(() =>
		props.rscs !== undefined ? FluxCube : props.rsc?.transition.component
	);

	const numRows = computed<number>(() => ceil(props.rows));

	const numCols = computed<number>(() => ceil(props.cols));

	const tiles = computed(() => {
		return GridCreator.getTilesProps({
			numRows: numRows.value,
			numCols: numCols.value,
			size: props.size,
			depth: props.depth,
			color: props.color,
			colors: props.colors,
			rsc: props.rsc,
			rscs: props.rscs,
			tileCss: props.tileCss,
		});
	});

	const $tiles: Ref<any[]> = ref([]);

	const transform = (cb: Function) => {
		$tiles.value.forEach((tile: any, index: number) => cb(tile, index));
	};

	defineExpose({
		setCss,
		transform,
		show,
		hide,
		getRowNumber,
		getColNumber,
	});
</script>

<template>
	<div ref="$el" :style="style">
		<component
			:is="component"
			v-for="(tile, index) in tiles"
			:ref="(el: any) => $tiles.push(el)"
			:key="index"
			v-bind="tile"
		/>
	</div>
</template>
