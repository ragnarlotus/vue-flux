<script setup lang="ts">
	import { ref, type Ref } from 'vue';
	import { vi } from 'vitest';
	import type { FluxImageProps } from '../types';

	defineProps<FluxImageProps>();

	const $el: Ref<null | HTMLDivElement> = ref(null);

	defineExpose({
		setCss: vi.fn(),
		transform: vi.fn(),
		show: vi.fn(),
		hide: vi.fn(),
	});
</script>

<template>
	<div ref="$el" class="flux-image" />
</template>
