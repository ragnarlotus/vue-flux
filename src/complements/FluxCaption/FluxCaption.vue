<script setup lang="ts">
	import { computed } from 'vue';
	import { ResourceIndex, TransitionIndex } from '../../repositories';

	export interface Props {
		currentResource: null | ResourceIndex;
		currentTransition: null | TransitionIndex;
	}

	const props = defineProps<Props>();

	const caption = computed<string>(() => {
		if (
			props.currentResource === null ||
			props.currentResource.rsc.caption === null
		) {
			return '&nbsp;';
		}

		return props.currentResource.rsc.caption;
	});

	const cssClasses = computed<string[]>(() => {
		const classes = ['flux-caption'];

		if (
			props.currentTransition === null &&
			props.currentResource !== null &&
			props.currentResource.rsc.caption !== null
		) {
			classes.push('visible');
		}

		return classes;
	});
</script>

<template>
	<div :class="cssClasses">
		{{ caption }}
	</div>
</template>

<style lang="scss">
	.vue-flux .flux-caption {
		flex: none;
		width: 100%;
		font-size: 0.8rem;
		line-height: 1.1rem;
		padding: 6px;
		box-sizing: border-box;
		color: white;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.65);
		opacity: 0;

		&.visible {
			opacity: 1;
			transition: opacity 0.3s ease-in;
		}
	}
</style>
