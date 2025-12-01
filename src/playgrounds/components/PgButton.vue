<script setup lang="ts">
	const props = withDefaults(defineProps<{ active?: boolean }>(), {
		active: false,
	});
</script>

<template>
	<button
		class="hover:bg-sky-700 text-white rounded px-2 w-full cursor-pointer"
		:class="props.active ? 'bg-amber-500' : 'bg-sky-500'"
	>
		<slot />
	</button>
</template>
