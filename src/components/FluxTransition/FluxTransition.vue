<script setup lang="ts">
	import {
		ref,
		reactive,
		computed,
		onMounted,
		onUnmounted,
		nextTick,
		Ref,
	} from 'vue';
	import { FluxTransitionProps } from './types';

	const props = withDefaults(defineProps<FluxTransitionProps>(), {
		options: () => ({}),
	});

	const $el: Ref<null | HTMLDivElement> = ref(null);
	const $transition: Ref<null | any> = ref(null);

	const emit = defineEmits(['start', 'end']);

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

	const getDuration = () =>
		$transition.value !== null ? $transition.value.totalDuration : 1;

	onMounted(async () => {
		emit('start', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
		});

		await nextTick();

		if ($transition.value === null) {
			console.error('Transition component available', props.transition);
		} else {
			$transition.value.onPlay();
		}

		setTimeout(() => {
			emit('end', {
				transition: props.transition,
				from: props.from,
				to: props.to,
				options: props.options,
			});
		}, getDuration());
	});

	onUnmounted(() => {
		if (props.displayComponent !== null) {
			props.displayComponent.show();
		}
	});
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
