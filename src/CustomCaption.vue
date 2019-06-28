<template>
	<flux-caption v-if="slider" :slider="slider" v-slot="slotProps">
		<a href="#" class="flux-caption">{{ slotProps.caption }}</a>
	</flux-caption>
</template>

<script>
	import FluxCaption from './components/complements/FluxCaption.vue';

	export default {
		name: 'CustomCaption',

		components: {
			FluxCaption,
		},

		props: {
			slider: Object,
		}
	};
</script>
