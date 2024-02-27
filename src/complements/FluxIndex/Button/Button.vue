<script setup lang="ts">
	import { Ref, computed, unref } from 'vue';
	import { FluxButton } from '../../../components';

	interface Props {
		mouseOver?: Ref<boolean>;
	}

	const props = withDefaults(defineProps<Props>(), {
		mouseOver: undefined,
	});

	const visible = computed<boolean>(() =>
		[true, undefined].includes(unref(props.mouseOver))
	);
</script>

<template>
	<transition name="fade">
		<FluxButton v-if="visible" class="toggle bottom left">
			<rect x="17.5" y="17.5" width="12px" height="12px" />
			<rect x="17.5" y="43" width="12px" height="12px" />
			<rect x="17.5" y="68.5" width="12px" height="12px" />
			<rect x="43" y="17.5" width="12px" height="12px" />
			<rect x="43" y="43" width="12px" height="12px" />
			<rect x="43" y="68.5" width="12px" height="12px" />
			<rect x="68.5" y="17.5" width="12px" height="12px" />
			<rect x="68.5" y="43" width="12px" height="12px" />
			<rect x="68.5" y="68.5" width="12px" height="12px" />
		</FluxButton>
	</transition>
</template>

<style lang="scss">
	.vue-flux .flux-index {
		.fade-enter,
		.fade-leave-to {
			opacity: 0;
		}

		.fade-enter-active,
		.fade-leave-active {
			transition: opacity 0.3s ease-in;
		}
	}
</style>
