<template>
	<div :style="style" ref="wrapper">
		<slot></slot>
	</div>
</template>

<script>
	import BaseComponent from '@/mixins/BaseComponent.js';

	export default {
		name: 'FluxWrapper',

		mixins: [
			BaseComponent,
		],

		data: () => ({
			baseStyle: {
				overflow: 'hidden',
			},
		}),

		computed: {
			style() {
				return {
					...this.baseStyle,
					...this.css,
				};
			},
		},

		methods: {
			transform(css) {
				this.$nextTick(() => {
					this.$refs.wrapper.clientHeight;
					this.setCss(css);
				});
			},
		},
	};
</script>
