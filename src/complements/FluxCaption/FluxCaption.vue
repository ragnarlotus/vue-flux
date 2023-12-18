<script setup lang="ts">
	import { computed } from 'vue';
	import { Player } from '../../controllers';

	export interface Props {
		player: Player;
	}

	const props = defineProps<Props>();

	const { resource, transition } = props.player;

	const caption = computed<string>(() => {
		if (resource.current === null || resource.current.rsc.caption === null) {
			return '&nbsp;';
		}

		return resource.current.rsc.caption;
	});

	const cssClasses = computed<string[]>(() => {
		const classes = ['flux-caption'];

		if (
			transition.current === null &&
			resource.current !== null &&
			resource.current.rsc.caption.length > 0
		) {
			classes.push('visible');
		}

		return classes;
	});
</script>

<template>
	<div :class="cssClasses">
		<slot :caption="caption">{{ caption }}</slot>
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
