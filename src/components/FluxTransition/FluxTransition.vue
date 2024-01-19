<script setup lang="ts">
	import {
		ref,
		reactive,
		computed,
		onMounted,
		onUnmounted,
		nextTick,
		Ref,
		type Component,
	} from 'vue';
	import { FluxTransitionProps } from './types';
	import { TransitionComponent } from '../../transitions';

	const props = withDefaults(defineProps<FluxTransitionProps>(), {
		options: () => ({}),
	});

	const $el: Ref<null | HTMLDivElement> = ref(null);
	const $transition: Ref<null | Component> = ref(null);

	const emit = defineEmits(['ready', 'start', 'end']);

	const styles = reactive({
		base: {
			overflow: 'hidden',
			perspective: 'none',
			zIndex: 3,
		},
	});

	const style = computed(() => {
		const { width, height } = props.size.toPx();

		return {
			...styles.base,
			width,
			height,
		};
	});

	const duration = ref(1);

	onMounted(async () => {
		await nextTick();

		if ($transition.value !== null) {
			duration.value = (
				$transition.value as TransitionComponent
			).totalDuration;
		}

		emit('ready', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
			duration: duration.value,
		});
	});

	async function start() {
		emit('start', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
			duration: duration.value,
		});

		await nextTick();

		if ($transition.value === null) {
			console.error('Transition component not available', props.transition);
		} else {
			($transition.value as TransitionComponent).onPlay();
		}

		setTimeout(() => end(), duration.value);
	}

	function end() {
		emit('end', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
			duration: duration.value,
		});
	}

	onUnmounted(() => {
		if (props.displayComponent) {
			props.displayComponent.show();
		}
	});

	defineExpose({ start });
</script>

<template>
	<div ref="$el" class="flux-transition" :style="style">
		<component
			:is="transition"
			ref="$transition"
			:size="size"
			:from="from"
			:to="to"
			:display-component="displayComponent"
			:options="options"
			:mask-style="styles.base"
		/>
	</div>
</template>

<style lang="scss">
	.flux-transition {
		position: relative;
	}
</style>
