<script setup lang="ts">
	import {
		ref,
		reactive,
		computed,
		onMounted,
		onUnmounted,
		nextTick,
		Component,
	} from 'vue';
	import Size from '../../shared/Size';
	import Resource from '../../resources/Resource';

	const $el = ref(null);
	const $transition = ref(null);

	const props = defineProps<{
		size: Size;
		transition: Object;
		from: Resource;
		to: Resource;
		displayComponent: null | Component;
		options: Object;
	}>();

	const emit = defineEmits(['start', 'end']);

	const styles = reactive({
		base: {
			overflow: 'hidden',
			perspective: 'none',
			zIndex: 3,
		},
	});

	const style = computed(() => {
		const { width, height } = props.size;

		return {
			...styles.base,
			width: width + 'px',
			height: height + 'px',
		};
	});

	const getDuration = () =>
		!$transition.value ? 1 : $transition.value.totalDuration;

	onMounted(async () => {
		emit('start', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
		});

		await nextTick();

		$transition.value!.onPlay();

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
		if (props.displayComponent) {
			props.displayComponent.value.show();
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
