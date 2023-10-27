<script setup lang="ts">
	import { Ref } from 'vue';
	import { Resource } from '../../../resources';
	import { Size } from '../../../shared';

	export interface Props {
		rsc: Resource;
		size: Ref<Size>;
	}

	defineProps<Props>();
</script>

<template>
	<li>
		<component
			:is="rsc.transition.component"
			:rsc="rsc"
			:size="size.value"
			:title="rsc.caption"
		/>
	</li>
</template>

<style lang="scss">
	.vue-flux .flux-index li {
		position: relative;
		display: inline-block;
		box-sizing: content-box;
		margin: 0 24px 24px 0;
		cursor: pointer;
		transition: all 0.3s ease;

		&:hover {
			box-shadow: 0px 0px 3px 2px rgba(255, 255, 255, 0.6);
		}

		&.current {
			cursor: auto;
			border: 1px solid white;
			box-shadow: none;
		}
	}
</style>
