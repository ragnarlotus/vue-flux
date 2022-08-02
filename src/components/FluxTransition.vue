<script setup>
	import {
		ref,
		reactive,
		computed,
		onMounted,
		onUnmounted,
	} from 'vue';

	const $el = ref(null);
	const $transition = ref(null);

	const props = defineProps({
		size: {
			type: Object,
			required: true,
		},

		transition: {
			type: Object,
			required: true,
		},

		from: {
			type: Object,
			required: true,
		},

		to: {
			type: Object,
			required: true,
		},

		displayComponent: Object,

		options: Object,
	});

	const emit = defineEmits(['ready', 'start', 'end']);

	const styles = reactive({
		base: {
			overflow: 'hidden',
			perspective: 'none',
			zIndex: 3,
		}
	});

	const style = computed(() => {
		const { width, height } = props.size;

		return {
			...styles.base,
			width: width +'px',
			height: height +'px',
		};
	});

	const getDuration = () => !$transition.value? 1 : $transition.value.totalDuration;

	const start = () => {
		$transition.value.onPlay();

		emit('start', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
		});

		setTimeout(() => {
			end();
		}, getDuration());
	};

	const end = () => {
		emit('end', {
			transition: props.transition,
			from: props.from,
			to: props.to,
			options: props.options,
		});
	};

	onMounted(() => {
		emit('ready');
	});

	onUnmounted(() => {
		if (props.displayComponent)
			props.displayComponent.show();
	});

	defineExpose({
		start,
		end,
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
