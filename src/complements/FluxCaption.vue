<script setup>
	import { computed } from 'vue';

	const props = defineProps({
		currentResource: {
			type: [Object, null],
			required: false,
		},

		currentTransition: {
			type: [Object, null],
			required: false,
		},
	});

	const caption = computed(() => {
		if (
			props.currentResource === null ||
			props.currentResource.rsc.caption === null
		) {
			return '&nbsp;';
		}

		return props.currentResource.rsc.caption;
	});

	const htmlClass = computed(() => {
		const css = ['flux-caption'];

		if (
			props.currentTransition === null &&
			props.currentResource !== null &&
			props.currentResource.rsc.caption !== null
		) {
			css.push('visible');
		}

		return css;
	});
</script>

<template>
	<div :class="htmlClass">
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
