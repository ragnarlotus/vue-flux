<script setup lang="ts">
	import {
		ref,
		reactive,
		computed,
		Ref,
		onBeforeUpdate,
		type Component,
	} from 'vue';
	import useComponent from '../useComponent';
	import { FluxGridProps } from './types';
	import { FluxCube } from '../';
	import { ComponentStyles } from '../types';
	import { GridFactory, getRowNumber, getColNumber } from './factories';

	const props = withDefaults(defineProps<FluxGridProps>(), {
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

	const tiles = computed(() => GridFactory.getTilesProps(props));

	const $tiles: Ref<Component[]> = ref([]);

	onBeforeUpdate(() => {
		$tiles.value = [];
	});

	const transform = (cb: Function) => {
		$tiles.value.forEach((tile: Component, index: number) => cb(tile, index));
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
	<div ref="$el" class="flux-grid" :style="style">
		<component
			:is="component"
			v-for="(tile, index) in tiles"
			:ref="(el: Component) => $tiles.push(el)"
			:key="index"
			v-bind="tile"
		/>
	</div>
</template>
