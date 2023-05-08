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
	import { Size } from '../../shared';
	import Resource from '../../resources/Resource';

	export interface Props {
		size: Size;
		transition: Object;
		from: Resource;
		to: Resource;
		displayComponent: Ref<null | any>;
		options: any;
	}

	const props = withDefaults(defineProps<Props>(), {
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
		const { width, height } = props.size;

		return {
			...styles.base,
			width: width + 'px',
			height: height + 'px',
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
		if (props.displayComponent.value !== null) {
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