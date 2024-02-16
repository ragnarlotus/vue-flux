<script setup lang="ts">
	import { ref, Ref } from 'vue';
	import { vi } from 'vitest';

	const $el: Ref<null | HTMLDivElement> = ref(null);

	defineExpose({
		turn: vi.fn(),
		setCss: vi.fn(),
		transform: vi.fn(),
		show: vi.fn(),
		hide: vi.fn(),
		getRowNumber: vi.fn(),
		getColNumber: vi.fn(),
	});
</script>

<template>
	<div ref="$el" />
</template>
