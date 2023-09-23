<script setup lang="ts">
	import { ref, reactive, computed, Ref } from 'vue';
	import useComponent from '../component';
	import { GridProps as Props } from './types';
	import { FluxCube } from '../';
	import { ComponentStyles } from '../../types';
	import GridCreator from './GridCreator';
	import { getRowNumber, getColNumber } from './GridTileCreator';

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

	const tiles = computed(() => GridCreator.getTilesProps(props));

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
